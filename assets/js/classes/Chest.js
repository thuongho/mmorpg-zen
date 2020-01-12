class Chest extends Phaser.Physics.Arcade.Image {
  constructor(scene, x, y, frame, coin, id) {
    super(scene, x, y, frame);
    // scene game object will be added to
    this.scene = scene;
    // amount of coint chest contain
    this.coins = coin;
    // pass this id back to game manager to let it know that this chest can be deleted
    this.id = id;

    // enable physics
    this.scene.physics.world.enable(this);
    // add player to existing scene
    this.scene.add.existing(this);
    // scale it to the same as other objects
    this.setScale(2);
  }

  makeActive() {
    this.setActive(true);
    this.setVisible(true);
    this.body.checkCollision.none = false;
  }

  makeInActive() {
    this.setActive(false);
    this.setVisible(false);
    // pick up the game object, collider will still be on the screen
    // setting to true, will make phaser not check for collisions
    this.body.checkCollision.none = true;
  }
}
