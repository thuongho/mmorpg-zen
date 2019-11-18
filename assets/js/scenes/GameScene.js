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
  }

  create() {
    // load audio (sound config: loop - false by default, volume, delay)
    this.goldPickupAudio = this.sound.add('goldSound', { loop: false, volume: 0.2 });
    
    // by default phaser will render object by origin of the object, which is center
    // you cannot animate image
    // var button = this.add.image(100,100, 'button1');
    // button.setOrigin(0.5, 0.5);
  
    // sprites can animate
    // this.add.sprite(300, 100, 'button1');
  
    // args(position, image name, frame)
    // this.chest = this.physics.add.image(300, 300, 'items', 0);
    this.chest = new Chest(this, 300, 300, 'items', 0);
  
    // ADD PHYSICS TO WALL
    this.wall = this.physics.add.image(500, 100, 'button1');
    // it has velocity so when collided, it will move with the velocity
    // MAKE WALL IMMOVABLE
    this.wall.setImmovable();
  
    // ADD PHYSICS TO PLAYER
    // this.player = this.physics.add.image(32, 32, 'characters', 0);
    this.player = new Player(this, 32, 32, 'characters', 0);
    // zoom
    this.player.setScale(2);
  
    // BOUNDARY
    this.player.body.colliderWorldBounds = true;
    // deprecated code
    // this.player.body.setColliderWorldBounds(true);
  
    // collide with wall
    this.physics.add.collider(this.player, this.wall);
    // overlap with chest
    this.physics.add.overlap(this.player, this.chest, this.collectChest, null, this);
  
    // phaser has keyboard manage
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    // pass cursor into player's update
    this.player.update(this.cursors);
  }

  collectChest(player, chest) {
    // play sound, play once by default
    // play gold pick up sound
    this.goldPickupAudio.play();
    // update score in the Ui
    this.events.emit('updateScore', chest.coins);
    // destroy chest
    chest.destroy();
  } 
}
