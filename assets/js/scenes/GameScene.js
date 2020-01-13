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
    this.createGroup();
    
    this.createInput();

    this.createGameManager();
  }

  update() {
    if (this.player) {
      // pass cursor into player's update
      this.player.update(this.cursors);
    }
  }

  createAudio() {
    // load audio (sound config: loop - false by default, volume, delay)
    this.goldPickupAudio = this.sound.add('goldSound', { loop: false, volume: 0.2 });
  }

  createPlayer(location) {
    // ADD PHYSICS TO PLAYER
    // this.player = this.physics.add.image(32, 32, 'characters', 0);
    // set player inside the non blocked layer of the map
    this.player = new Player(this, location[0] * 2, location[1] * 2, 'characters', 0);
    // zoom
    this.player.setScale(2);
  
    // BOUNDARY
    this.player.body.colliderWorldBounds = true;
    // deprecated code
    // this.player.body.setColliderWorldBounds(true);
  }

  createGroup() {
    // pass a group to an overlap and Phaser will check logic
    // create chest group
    this.chests = this.physics.add.group();

    // create monster group
    this.monsters = this.physics.add.group();
  }

  spawnChest(chestObject) {
    const location = [chestObject.x * 2, chestObject.y * 2];
    // Phaser will loop through chest array and look for inactive object
    // return the inactive game object
    // reuse game object
    let chest = this.chests.getFirstDead();
    // console.log('chest', chest);
    if (!chest) {
      // args(position, image name, frame)
      // this.chest = this.physics.add.image(300, 300, 'items', 0);
      chest = new Chest(this, location[0], location[1], 'items', chestObject.gold, chestObject.id);
      this.chests.add(chest);
    } else {
      chest.coins = chestObject.gold;
      chest.id = chestObject.id;
      chest.setPosition(location[0], location[1]);
      chest.makeActive();
    }
  }

  spawnMonster(monsterObject) {
    const location = [monsterObject.x * 2, monsterObject.y * 2];
    let monster = this.monsters.getFirstDead();

    if (!monster) {
      monster = new Monster(
        this,
        location[0],
        location[1],
        'monsters',
        monsterObject.frame,
        monsterObject.id,
        monsterObject.health,
        monsterObject.maxHealth
      );
      this.monsters.add(monster);
    } else {
      monster.id = monsterObject.id;
      monster.health = monsterObject.health;
      // params: asset, frame of spritesheet
      monster.setTexture['monsters', monsterObject.frame];
      monster.setPosition(location[0], location[1]);
      monster.makeActive();
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
    // collide with blocked layer
    this.physics.add.collider(this.player, this.map.blockedLayer);
    // overlap with chest / chest group
    this.physics.add.overlap(this.player, this.chests, this.collectChest, null, this);
    // check for collisions between monster group and tiled blocked
    this.physics.add.collider(this.monsters, this.map.blockedLayer);
    // check for overlap btw player and monster game objects
    this.physics.add.overlap(this.player, this.monsters, this.enemyOverlap, null, this);
  }

  enemyOverlap(player, enemy) {
    enemy.makeInActive();
    this.events.emit('destroyEnemy', enemy.id);
  }

  collectChest(player, chest) {
    console.log('collect chest', chest);
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
    // this.time.delayedCall(1000, this.spawnChest, [], this);
    // update game manager
    this.events.emit('pickUpChest', chest.id);
  }

  createMap() {
    // CREATE MAP
    this.map = new Map(this, 'map', 'background', 'background', 'blocked');
  }

  createGameManager() {
    // listen for player spawn from the game manager
    this.events.on('spawnPlayer', (location) => {
      this.createPlayer(location);
      this.addCollisions();
    });

    this.events.on('chestSpawned', (chest) => {
      this.spawnChest(chest);
    });

    this.events.on('monsterSpawned', (monster) => {
      this.spawnMonster(monster);
    })

    // objects are the objects layers in the tile
    this.gameManager = new GameManager(this, this.map.map.objects);
    this.gameManager.setup();
  }
}
