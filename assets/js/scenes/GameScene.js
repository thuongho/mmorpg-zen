class GameScene extends Phaser.Scene {
  constructor() {
    // call constructor of parent class
    super('Game');
  }

  preload() {

  }

  create() {
    // load audio (sound config: loop - false by default, volume, delay)
    var goldPickupAudio = this.sound.add('goldSound', { loop: false, volume: 0.2 });
    
    // by default phaser will render object by origin of the object, which is center
    // you cannot animate image
    var button = this.add.image(100,100, 'button1');
    button.setOrigin(0.5, 0.5);
  
    // sprites can animate
    this.add.sprite(300, 100, 'button1');
  
    // args(position, image name, frame)
    this.chest = this.physics.add.image(300, 300, 'items', 0);
  
    // ADD PHYSICS TO WALL
    this.wall = this.physics.add.image(500, 100, 'button1');
    // it has velocity so when collided, it will move with the velocity
    // MAKE WALL IMMOVABLE
    this.wall.setImmovable();
  
    // ADD PHYSICS TO PLAYER
    this.player = this.physics.add.image(32, 32, 'characters', 0);
    // zoom
    this.player.setScale(2);
  
    // BOUNDARY
    this.player.body.colliderWorldBounds = true;
    // deprecated code
    // this.player.body.setColliderWorldBounds(true);
  
    // collide with wall
    this.physics.add.collider(this.player, this.wall);
    // overlap with chest
    this.physics.add.overlap(this.player, this.chest, function(player, chest) { 
      // play sound, play once by default
      goldPickupAudio.play();
      // destroy chest
      chest.destroy();
    });
  
    // phaser has keyboard manage
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    // horizontal velocity, vertical velocity
    this.player.setVelocity(0);
  
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
    }
  
    if (this.cursors.up.isDown) {
      this.player.setVelocityY(-160);
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(160);
    }
  }
}