class Chest extends Phaser.Physics.Arcade.Image {
  constructor(scene, x, y, frame) {
    super(scene, x, y, frame);
    this.scene = scene;
    this.coins = 10;

    // enable physics
    this.scene.physics.world.enable(this);
    // add player to existing scene
    this.scene.add.existing(this);
  }
}
