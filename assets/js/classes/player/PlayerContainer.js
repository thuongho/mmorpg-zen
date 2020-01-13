class PlayerContainer extends Phaser.GameObjects.Container {
  constructor(scene, x, y, key, frame) {
    super(scene, x, y);
    this.scene = scene;
    // velocity when moving our player
    this.velocity = 160;

    // set size on container, by default container doesn't have size until items are added to it
    this.setSize(64, 64);
    // enable physics
    this.scene.physics.world.enable(this);
    // set immovable if another object collides with our player
    // default is true
    // this.setImmovable(false);
    // scale our player
    // this.setScale(2);
    // collide with world bounds
    this.body.setCollideWorldBounds(true);
    // add player to existing scene
    this.scene.add.existing(this);
    // make camera follow the player
    this.scene.cameras.main.startFollow(this);

    // create a player
    this.player = new Player(this.scene, 0, 0, key, frame);
    // add player to this container
    this.add(this.player);
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
