class UiScene extends Phaser.Scene {
  constructor() {
    // call constructor of parent class
    super('Ui');
  }

  init() {
    // grab a reference to game scene
    this.gameScene = this.scene.get('Game');
  }

  create() {
    this.setupUiElements();
    this.setupEvents();
  }

  setupUiElements() {
    // create score text game object
    this.scoreText = this.add.text(35, 8, 'Coins: 0', {fontSize: '16px', fill: '#FFF'});
    // add coin icon
    this.coinIcon = this.add.image(15, 15, 'items', 3);
  }

  setupEvents() {
    // listen for the updateScore event from the game scene
    this.gameScene.events.on('updateScore', (score) => {
      this.scoreText.setText(`Coins: ${score}`);
    })
  }
}