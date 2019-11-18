class Chest extends Phaser.Physics.Arcade.Image {
  constructor(scene, x, y, frame) {
    super(scene, x, y, frame);
    // scene game object will be added to
    this.scene = scene;
    // amount of coint chest contain
    this.coins = 10;

    // enable physics
    this.scene.physics.world.enable(this);
    // add player to existing scene
    this.scene.add.existing(this);
  }
}
