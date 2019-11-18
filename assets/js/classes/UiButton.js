class UiButton extends Phaser.GameObjects.Container {
  // hoverKey is the hover image
  // targetCallback - function to call when player interacts with button
  constructor(scene, x, y, key, hoverKey, text, targetCallback) {
    super(scene, x, y);
    // scene this container will be added to
    this.scene = scene;
    this.x = x;
    this.y = y;
    // backgroud image of our button
    this.key = key;
    // image that will be displayed when the player hovers over the button
    this.hoverKey = hoverKey;
    // text that will be displayed on the button
    this.text = text;
    this.targetCallback = targetCallback;

    // create our Ui Button
    this.createButton();
    // add this container to our Phaser Scene
    this.scene.add.existing(this);
  }

  createButton() {
    // create play game button
    // create title text
    // create button text
    // x, y, text, config (size, color)
    this.button = this.scene.add.image(0, 0, 'button1');
  
    // make interactive to get events
    this.button.setInteractive();
    // scale button
    this.button.setScale(1.4);

    // add button text
    this.buttonText = this.scene.add.text(0, 0, this.text, { fontSize: '26px', fill: '#FFF'});
    // add text in button
    Phaser.Display.Align.In.Center(this.buttonText, this.button);

    // add the 2 game objects to our container
    this.add(this.button);
    this.add(this.buttonText);

    // listen to events
    // events to have a hoover effect
    this.button.on('pointerdown', () => {
      // console.log('pointer down');
      // this.scene.start('Game');
      this.targetCallback();
    });
    this.button.on('pointerover', () => {
      // console.log('pointer over');
      this.button.setTexture(this.hoverKey);
    });
    this.button.on('pointerout', () => {
      // console.log('pointer out');
      this.button.setTexture(this.key);
    });
  }
}