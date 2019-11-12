var config = {
  type: Phaser.AUTO, // WebGL or Canvas,
  width: 800,
  height:600,
  // scene: {
  //   // initialize the scene
  //   // init: init,
  //   // preload state
  //   // add assets before screen is loaded to scene
  //   preload: preload,
  //   // create game elements
  //   // position char, enemies
  //   create: create,
  //   // moving game obj, game mechanics
  //   update: update,
  //   // cleaning up the game
  //   // cleanup: cleanup
  // },
  scene: [
    BootScene,
    TitleScene,
    GameScene,
    UiScene
  ],
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
