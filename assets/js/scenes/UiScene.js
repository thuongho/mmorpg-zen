class UiScene extends Phaser.Scene {
  constructor() {
    // call constructor of parent class
    super('Ui');
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

  }
}