const Direction = {
  RIGHT: 'RIGHT',
  LEFT: 'LEFT',
  UP: 'UP',
  DOWN: 'DOWN'
};

class PlayerContainer extends Phaser.GameObjects.Container {
  constructor(scene, x, y, key, frame) {
    super(scene, x, y);
    this.scene = scene;
    // velocity when moving our player
    this.velocity = 160;
    this.currentDirection = Direction.RIGHT;
    this.playerAttacking = false;
    this.flipX = true;
    this.swordHit = false;

    // set size on container, by default container doesn't have size until items are added to it
    this.setSize(64, 64);
    // enable physics
    this.scene.physics.world.enable(this);
    // set immovable if another object collides with our player
    // default is true
    // this.setImmovable(false);
    // scale our player
    // this.setScale(2);
    // collide with world bounds
    this.body.setCollideWorldBounds(true);
    // add player to existing scene
    this.scene.add.existing(this);
    // make camera follow the player
    this.scene.cameras.main.startFollow(this);

    // create a player
    this.player = new Player(this.scene, 0, 0, key, frame);
    // add player to this container
    this.add(this.player);

    // creat weapon grame object
    this.weapon = this.scene.add.image(40, 0, 'items', 4);
    // add weapon to existing scene
    this.scene.add.existing(this.weapon);
    // scale the weapon
    this.weapon.setScale(1.5);
    // add physics to weapon
    this.scene.physics.world.enable(this.weapon);
    this.add(this.weapon);
    // only show the weapon when moving
    this.weapon.alpha = 0;
  }

  // update is not called automatically
  update(cursors) {
    // horizontal velocity, vertical velocity
    // use body because this is now part of player
    this.body.setVelocity(0);
  
    if (cursors.left.isDown) {
      this.body.setVelocityX(-this.velocity);
      this.currentDirection = Direction.LEFT;
      this.weapon.setPosition(-40, 0);
    } else if (cursors.right.isDown) {
      this.body.setVelocityX(this.velocity);
      this.currentDirection = Direction.RIGHT;
      this.weapon.setPosition(40, 0);
    }
  
    if (cursors.up.isDown) {
      this.body.setVelocityY(-this.velocity);
      this.currentDirection = Direction.UP;
      this.weapon.setPosition(0, -40);
    } else if (cursors.down.isDown) {
      this.body.setVelocityY(this.velocity);
      this.currentDirection = Direction.DOWN;
      this.weapon.setPosition(0, 40);
    }

    // JustDown will detect if the key was just down
    if (Phaser.Input.Keyboard.JustDown(cursors.space) && !this.playerAttacking) {
      this.weapon.alpha = 1;
      this.playerAttacking = true;
      // stop player attacking after 150 ms
      this.scene.time.delayedCall(150, () => {
        this.weapon.alpha = 0;
        this.playerAttacking = false;
        this.swordHit = false;
      }, [], this);
    }

    if (this.playerAttacking) {
      if (this.weapon.flipX) {
        // rotate weapon counter clockwise
        this.weapon.angle -= 10;
      } else {
        this.weapon.angle += 10;
      }
    } else {
      if (this.currentDirection === Direction.DOWN) {
        this.weapon.setAngle(-270);
      } else if (this.currentDirection === Direction.UP) {
        this.weapon.setAngle(-90);
      } else {
        this.weapon.setAngle(0);
      }

      this.weapon.flipX = false;
      if (this.currentDirection === Direction.LEFT) {
        // flipX tells Phaser to flip on x axis
        this.weapon.flipX = true;
      }
    }
  }
}
