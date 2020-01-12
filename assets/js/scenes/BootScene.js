class BootScene extends Phaser.Scene {
  constructor() {
    // call constructor of parent class
    super('Boot');
  }

  preload() {
    // load images
    this.loadImages();
    
    // load spritesheets
    this.loadSpriteSheets();

    // load audio
    this.loadAudio();

    // load tilemap
    this.loadTileMap();
  }

  loadImages() {
    // tells phaser to load in some type of asset
    // this image method takes (key, location)
    this.load.image('button1', 'assets/images/ui/blue_button01.png');
    this.load.image('button2', 'assets/images/ui/blue_button02.png');
    // load the map tileset image
    this.load.image('background', 'assets/level/background-extruded.png');
  }

  loadSpriteSheets() {
    // set frame, margin
    this.load.spritesheet('items', 'assets/images/items.png', { frameWidth: 32, frameHeight: 32});
    this.load.spritesheet('characters', 'assets/images/characters.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('monsters', 'assets/images/monsters.png', { frameWidth: 32, frameHeight: 32 });
  }

  loadAudio() {
    this.load.audio('goldSound', ['assets/audio/Pickup.wav']);
  }

  loadTileMap() {
    // map made with Tiled in Json format
    this.load.tilemapTiledJSON('map', 'assets/level/large_level.json');
  }

  create() {
    // transition from Boot to Title
    // this.scene.start('Title');
    this.scene.start('Game');
  }
}
