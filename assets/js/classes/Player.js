class Player extends Phaser.Physics.Arcade.Image {
  constructor(scene, x, y, frame) {
    super(scene, x, y, frame);
    this.scene = scene;
    // velocity when moving our player
    this.velocity = 160;

    // enable physics
    this.scene.physics.world.enable(this);
    // set immovable if another object collides with our player
    // default is true
    this.setImmovable(false);
    // scale our player
    this.setScale(2);
    // collide with world bounds
    this.setCollideWorldBounds(true);
    // add player to existing scene
    this.scene.add.existing(this);
  }

  // update is not called automatically
  update(cursors) {
    // horizontal velocity, vertical velocity
    // use body because this is now part of player
    this.body.setVelocity(0);
  
    if (cursors.left.isDown) {
      this.body.setVelocityX(-this.velocity);
    } else if (cursors.right.isDown) {
      this.body.setVelocityX(this.velocity);
    }
  
    if (cursors.up.isDown) {
      this.body.setVelocityY(-this.velocity);
    } else if (cursors.down.isDown) {
      this.body.setVelocityY(this.velocity);
    }
  }
}
