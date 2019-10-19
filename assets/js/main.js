var config = {
  type: Phaser.AUTO, // WebGL or Canvas,
  width: 800,
  height:600,
  scene: {
    // initialize the scene
    // init: init,
    // preload state
    // add assets before screen is loaded to scene
    preload: preload,
    // create game elements
    // position char, enemies
    create: create,
    // moving game obj, game mechanics
    update: update,
    // cleaning up the game
    // cleanup: cleanup
  },
  phsycs: {
    // type of engine to use
    default: 'arcade',
    arcade: {
      debug: true,
      gravity: {
        // which direction to add in our game
        y: 0
      }
    }
  }
};

// scene can be one or multiple
// game world
// phaser scene monitor
// title screen, loading screen, title

var game = new Phaser.Game(config);

function preload() {
  // tells phaser to load in some type of asset
  // this image method takes (key, location)
  this.load.image('button1', 'assets/images/ui/blue_button01.png');
  // set frame, margin
  this.load.spritesheet('items', 'assets/images/items.png', { frameWidth: 32, frameHeight: 32});
  this.load.spritesheet('characters', 'assets/images/characters.png', { frameWidth: 32, frameHeight: 32 });
}

function create() {
  // by default phaser will render object by origin of the object, which is center
  // you cannot animate image
  this.add.image(100,100, 'button1');
  GamepadButton.setOrigin(0.5,0.5);

  // sprites can animate
  this.add.sprite(300, 100, 'button1');
  // position, image name, frame
  this.add.image(300, 300, 'items', 1);

  // to use physics in our game
  this.physics.add.image(500, 100, 'button1');

  // add physics to character
  this.player = this.physics.add.image(32, 32, 'characters', 0);
  // zoom
  this.player.setScale(2);

  // phaser has keyboard manage
  this.cursors = this.input.keyboard.createCursorKeys();
}

function update() {
  // horizontal velocity, vertical velocity
  this.player.setVelocity(0);

  if (this.cursors.left.isDown) {
    console.log('left');
    this.player.setVelocityX(-160);
  } else if (this.cursors.right.isDown) {
    console.log('right');
    this.player.setVelocityX(160);
  }

  if (this.cursors.up.isDown) {
    console.log('up');
    this.player.setVelocityY(160);
  } else if (this.cursors.down.isDown) {
    console.log('down');
    this.player.setVelocityY(-160);
  }
}