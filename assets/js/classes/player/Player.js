class Player extends Phaser.Physics.Arcade.Image {
  constructor(scene, x, y, key, frame) {
    super(scene, x, y, key, frame);
    this.scene = scene;

    // enable physics
    this.scene.physics.world.enable(this);
    // set immovable if another object collides with our player
    // default is true
    this.setImmovable(false);
    // scale our player
    this.setScale(2);
    // add player to existing scene
    this.scene.add.existing(this);
  }

  // movements will be high level on player container
}
