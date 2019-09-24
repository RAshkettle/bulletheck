import Phaser from 'phaser';
import config from '../config';
import Bullet from '../bullet';


let offsetX;
let offsetY;
let targetX;
let targetY;
const gamestart = true;
let isFiring = false;
let player;
let leftGun;
let rightGun;
let lastFired = 0;

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
        player = this.physics.add.sprite(100, 270, 'playerShip');
        this.laser = this.sound.add('laser');

        leftGun = this.add.image(100, 270, 'shotFired');
        leftGun.setVisible(false);

        rightGun = this.add.image(100, 270, 'shotFired');
        rightGun.setVisible(false);
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
                    isFiring = true;
                    targetX = pointer.x + offsetX;
                    targetY = pointer.y + offsetY;
                    if (targetX > 500) {
                        targetX = 500;
                    } else if (targetX < 70) {
                        targetX = 70;
                    }
                    if (targetY > 550) {
                        targetY = 550;
                    } else if (targetY < 40) {
                        targetY = 40;
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

        this.input.on('pointerup', () => {
            isFiring = false;
        }, this);

        this.bulletsL = this.physics.add.group({
            classType: Bullet,
            maxSize: 10,
            runChildUpdate: true,
        });
        this.bulletsR = this.physics.add.group({
            classType: Bullet,
            maxSize: 10,
            runChildUpdate: true,
        });
    }

    update(time, delta) {
        if (!isFiring) {
            leftGun.setVisible(false);
            rightGun.setVisible(false);
        } else {
            if (time > lastFired) {
                const bulletL = this.bulletsL.get();
                const bulletR = this.bulletsR.get();
                if (bulletL && bulletR) {
                    bulletL.fire(player.x + 50, player.y + 20, 'shotFired', 1200, 0);
                    bulletR.fire(player.x + 50, player.y - 20, 'shotFired', 1200, 0);
                    this.laser.play();
                    lastFired = time + 100;
                }
            }
            leftGun.x = player.x + 50;
            leftGun.y = player.y - 20;
            rightGun.x = player.x + 50;
            rightGun.y = player.y + 20;

            leftGun.setVisible(true);
            rightGun.setVisible(true);
        }
        // scroll the texture of the tilesprites proportionally to the layer
        this.bg_1.tilePositionX += 0.3;
        this.bg_2.tilePositionX += 0.6;
        
    }

  
}
