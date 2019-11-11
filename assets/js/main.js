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
  physics: {
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
  this.load.audio('goldSound', ['assets/audio/Pickup.wav']);
}

function create() {
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

function update() {
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
