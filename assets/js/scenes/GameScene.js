class GameScene extends Phaser.Scene {
  constructor() {
    // call constructor of parent class
    super('Game');
  }

  init() {
    // add coin over game scene
    // launch instead of start
    // launch is parallel, start is shut down the current
    // rendering order is launch on top of current
    this.scene.launch('Ui');
    // keep track of score
    this.score = 0;
  }

  create() {
    this.createMap();
    this.createAudio();
    this.createChest();
    this.createPlayer();
    this.addCollisions();
    this.createInput();
  }

  update() {
    // pass cursor into player's update
    this.player.update(this.cursors);
  }

  createAudio() {
    // load audio (sound config: loop - false by default, volume, delay)
    this.goldPickupAudio = this.sound.add('goldSound', { loop: false, volume: 0.2 });
  }

  createPlayer() {
    // ADD PHYSICS TO PLAYER
    // this.player = this.physics.add.image(32, 32, 'characters', 0);
    this.player = new Player(this, 32, 32, 'characters', 0);
    // zoom
    this.player.setScale(2);
  
    // BOUNDARY
    this.player.body.colliderWorldBounds = true;
    // deprecated code
    // this.player.body.setColliderWorldBounds(true);
  }

  createChest() {
    // pass a group to an overlap and Phaser will check logic
    // create chest group
    this.chests = this.physics.add.group();
    // carete chest positions array
    this.chestPositions = [[100, 100], [200, 200], [300, 300], [400, 400], [500, 500]];
    // specify the max number of chest we can have
    this.maxNumberOfChests = 3;
    // spawn a chest
    for (let i = 0; i < this.maxNumberOfChests; i++) {
      this.spawnChest();
    }
  }

  spawnChest() {
    const location = this.chestPositions[Math.floor(Math.random() * this.chestPositions.length)];
    
    // Phaser will loop through chest array and look for inactive object
    // return the inactive game object
    // reuse game object
    let chest = this.chests.getFirstDead();
    console.log('chest', chest);
    if (!chest) {
      // args(position, image name, frame)
      // this.chest = this.physics.add.image(300, 300, 'items', 0);
      const chest = new Chest(this, location[0], location[1], 'items', 0);
      this.chests.add(chest);
    } else {
      chest.setPosition(location[0], location[1]);
      chest.makeActive();
    }
    
  }

  // createWalls() {
  //   // ADD PHYSICS TO WALL
  //   this.wall = this.physics.add.image(500, 100, 'button1');
  //   // it has velocity so when collided, it will move with the velocity
  //   // MAKE WALL IMMOVABLE
  //   this.wall.setImmovable();
  // }

  createInput() {
    // phaser has keyboard manage
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  addCollisions() {
    // collide with wall
    this.physics.add.collider(this.player, this.wall);
    // overlap with chest / chest group
    this.physics.add.overlap(this.player, this.chests, this.collectChest, null, this);
  }

  collectChest(player, chest) {
    // play sound, play once by default
    // play gold pick up sound
    this.goldPickupAudio.play();
    // update score
    this.score += chest.coins;
    // update score in the Ui
    this.events.emit('updateScore', this.score);
    // destroy chest
    // chest.destroy();
    // make chest inactive
    chest.makeInActive();
    // spawn new chest
    // Phaser timer function to execute
    this.time.delayedCall(1000, this.spawnChest, [], this);
  }

  createMap() {
    // create the tile map
    this.map = this.make.tilemap({ key: 'map' });
    // add the tileset image to our map
    // params: has to match image in bootscene, key, size, margin, space
    this.tiles = this.map.addTilesetImage('background', 'background', 32, 32, 1, 2)
    // create our background
    // params: key, tiles, starting x, y
    this.backgroundLayer = this.map.createStaticLayer('background', this.tiles, 0, 0);
    // scale the layer to the size of player
    this.backgroundLayer.setScale(2);
    // create block layer
    this.blockedLayer = this.map.createStaticLayer('blocked', this.tiles, 0, 0);
    this.blockedLayer.setScale(2);
  }
}
