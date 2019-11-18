class BootScene extends Phaser.Scene {
  constructor() {
    // call constructor of parent class
    super('Boot');
  }

  preload() {
    // tells phaser to load in some type of asset
    // this image method takes (key, location)
    this.load.image('button1', 'assets/images/ui/blue_button01.png');
    this.load.image('button2', 'assets/images/ui/blue_button02.png');
    // set frame, margin
    this.load.spritesheet('items', 'assets/images/items.png', { frameWidth: 32, frameHeight: 32});
    this.load.spritesheet('characters', 'assets/images/characters.png', { frameWidth: 32, frameHeight: 32 });
    this.load.audio('goldSound', ['assets/audio/Pickup.wav']);
  }

  create() {
    // transition from Boot to Game
    this.scene.start('Title');
  }
}
