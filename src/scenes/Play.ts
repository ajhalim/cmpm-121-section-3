import * as Phaser from "phaser";

import starfieldUrl from "/assets/starfield.png";

let currentlyFiring: boolean = false;

export default class Play extends Phaser.Scene {
  fire?: Phaser.Input.Keyboard.Key;
  left?: Phaser.Input.Keyboard.Key;
  right?: Phaser.Input.Keyboard.Key;

  starfield?: Phaser.GameObjects.TileSprite;
  spinner?: Phaser.GameObjects.Shape;

  ship?: Phaser.GameObjects.Shape;
  ship1?: Phaser.GameObjects.Shape;

  velocity = 10;

  rotationSpeed = Phaser.Math.PI2 / 1000; // radians per millisecond

  constructor() {
    super("play");
  }

  preload() {
    this.load.image("starfield", starfieldUrl);
  }

  #addKey(
    name: keyof typeof Phaser.Input.Keyboard.KeyCodes,): Phaser.Input.Keyboard.Key {
    return this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes[name]);
  }

  create() {
    this.fire = this.#addKey("F");
    this.left = this.#addKey("LEFT");
    this.right = this.#addKey("RIGHT");

    this.starfield = this.add
      .tileSprite(
        0,
        0,
        this.game.config.width as number,
        this.game.config.height as number,
        "starfield",
      )
      .setOrigin(0, 0);

    this.spinner = this.add.rectangle(300, 450, 50, 50, 0x01769);
    //this.physics.add.existing(this.spinner);

    this.ship = this.add.rectangle(550,100, 50,50, 0xeb4034);
    this.ship1 = this.add.rectangle(550,200, 50,50, 0xeb4034);
  }

  update(_timeMs: number, delta: number) {
    this.starfield!.tilePositionX -= 4;

    if (this.left!.isDown) {
      this.spinner!.rotation -= delta * this.rotationSpeed;
    }
    if (this.right!.isDown) {
      this.spinner!.rotation += delta * this.rotationSpeed;
    }

    if (this.fire!.isDown) {
      this.tweens.add({
        targets: this.spinner,
        scale: { from: 3, to: .5},
        duration: 300,
        ease: Phaser.Math.Easing.Sine.Out,
      });

      if(currentlyFiring == false){
        currentlyFiring = true;
      }

      if(currentlyFiring == true){
        this.spinner?.setPosition(this.spinner.x, this.spinner.y-this.velocity);
      }
      // /this.spinner.

    }
  }
}
