import Phaser from 'phaser';
import config from '../config';
import Player from '../player';


const gamestart = true;
let player;

export default class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    createParallaxBackground() {
        // create an tiled sprite with the size of our game screen
        this.bg_1 = this.add.tileSprite(0, 0, config.width, config.height, 'bg1');
        // Set its pivot to the top left corner
        this.bg_1.setOrigin(0, 0);
        // fixe it so it won't move when the camera moves.
        // Instead we are moving its texture on the update
        this.bg_1.setScrollFactor(0);

        // Add a second background layer. Repeat as in bg_1
        this.bg_2 = this.add.tileSprite(0, 0, config.width, config.height, 'bg2');
        this.bg_2.setOrigin(0, 0);
        this.bg_2.setScrollFactor(0);
    }

    scrollParallaxBackground() {
        // scroll the texture of the tilesprites proportionally to the layer
        this.bg_1.tilePositionX += 0.3;
        this.bg_2.tilePositionX += 0.6;
    }

    create() {
        this.createParallaxBackground();
        player = new Player(this, 100, 270);

        this.input.on('pointerdown', () => {
            player.pointerDown(this.input.activePointer.x, this.input.activePointer.y);
        }, this);

        this.input.on('pointermove', (pointer) => {
            if (gamestart) {
                player.pointerMove(pointer);
            }
        }, this);

        this.input.on('pointerup', () => {
            player.pointerUp();
        }, this);
    }

    update(time, delta) {
        player.update(time, delta);
        this.scrollParallaxBackground();
    }
}
