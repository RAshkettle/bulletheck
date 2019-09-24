import Phaser from 'phaser';
import config from '../config';

let offsetX;
let offsetY;
let targetX;
let targetY;
const gamestart = true;
export default class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    create() {
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
        const player = this.physics.add.sprite(100, 270, 'playerShip');
        // player.anchor.setTo(0.5, 0.5);
        player.setAngle(90);
        player.setCollideWorldBounds(true);

        this.anims.create({
            key: 'normal',
            frames: this.anims.generateFrameNames('myShip', {
                prefix: 'Exhaust_1_2_00', start: 0, end: 9, suffix: '.png',
            }),
            frameRate: 10,
            repeat: -1,
        });


        player.anims.play('normal');
        player.body.moves = false;
        player.setVisible(true);

        this.input.on('pointerdown', () => {
            offsetX = player.x - this.input.activePointer.x;
            offsetY = player.y - this.input.activePointer.y;
        }, this);

        this.input.on('pointermove', (pointer) => {
            if (gamestart) {
                if (pointer.isDown) {
                    targetX = pointer.x + offsetX;
                    targetY = pointer.y + offsetY;
                    if (targetX > 500) {
                        targetX = 500;
                    } else if (targetX < 70) {
                        targetX = 70;
                    }

                    player.x = targetX;
                    player.y = targetY;
                } else if (Math.abs(player.x - targetX) <= 30
                             || Math.abs(player.y - targetY) <= 30) {
                    player.setVelocityX(player.body.velocity.x / 1.1);
                    player.setVelocityY(player.body.velocity.y / 1.1);
                }
            }
        }, this);
    }

    update() {
        // scroll the texture of the tilesprites proportionally to the layer
        this.bg_1.tilePositionX += 0.3;
        this.bg_2.tilePositionX += 0.6;   
    }
}
