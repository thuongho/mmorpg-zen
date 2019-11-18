class TitleScene extends Phaser.Scene {
  constructor() {
    // call constructor of parent class
    super('Title');
  }

  create() {
    // create title text
    // x, y, text, config (size, color)
    this.titleText = this.add.text(this.scale.width / 2, this.scale.height / 2, 'Sam MMORPG', { fontSize: '64px', fill: '#FFFFFF'});

    this.titleText.setOrigin(0.5);
    this.button = this.add.image(this.scale.width / 2, this.scale.height * 0.65, 'button1');
    // button.setOrigin(0.5, 0.5);
  
    // // sprites can animate
    // this.add.sprite(300, 100, 'button1');
    // make interactive to get events
    this.button.setInteractive();

    // add button text
    this.buttonText = this.add.text(0, 0, 'Start', { fontSize: '26px', fill: '#FFF'});
    // add text in button
    Phaser.Display.Align.In.Center(this.buttonText, this.button);

    // events to have a hoover effect
    this.button.on('pointerdown', () => {
      console.log('pointer down');
      this.scene.start('Game');
    });
    this.button.on('pointerover', () => {
      console.log('pointer over');
      this.button.setTexture('button2');
    });
    this.button.on('pointerout', () => {
      console.log('pointer out');
      this.button.setTexture('button1');
    });
  }
}