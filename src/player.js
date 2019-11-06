import Phaser from 'phaser';
import Bullet from './bullet';

let lastFired = 0;
let offsetX;
let offsetY;

export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'playerShip');
        this.x = x;
        this.y = y;
        this.scene = scene;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setAngle(90);
        this.setCollideWorldBounds(true);
        this.isFiring = false;

        this.laser = scene.sound.add('laser');

        this.bulletsL = scene.physics.add.group({
            classType: Bullet,
            maxSize: 10,
            runChildUpdate: true,
        });
        this.bulletsR = scene.physics.add.group({
            classType: Bullet,
            maxSize: 10,
            runChildUpdate: true,
        });
        scene.anims.create({
            key: 'normal',
            frames: scene.anims.generateFrameNames('myShip', {
                prefix: 'Exhaust_1_2_00', start: 0, end: 9, suffix: '.png',
            }),
            frameRate: 10,
            repeat: -1,
        });


        this.anims.play('normal');
        this.body.moves = false;
        this.setVisible(true);
        this.leftGun = scene.add.image(100, 270, 'shotFired');
        this.leftGun.setVisible(false);

        this.rightGun = scene.add.image(100, 270, 'shotFired');
        this.rightGun.setVisible(false);
    }

    update(time) {
        if (Number.isNaN(this.x)) {
            this.x = 100;
        }

        if (Number.isNaN(this.y)) {
            this.y = 270;
        }
        if (!this.isFiring) {
            this.leftGun.setVisible(false);
            this.rightGun.setVisible(false);
        } else {
            if (time > lastFired) {
                const bulletL = this.bulletsL.get();
                const bulletR = this.bulletsR.get();
                if (bulletL && bulletR) {
                    bulletL.fire(this.x + 50, this.y + 20, 'shotFired', 1200, 0);
                    bulletR.fire(this.x + 50, this.y - 20, 'shotFired', 1200, 0);
                    this.laser.play();
                    lastFired = time + 100;
                }
            }
            this.leftGun.x = this.x + 50;
            this.leftGun.y = this.y - 20;
            this.rightGun.x = this.x + 50;
            this.rightGun.y = this.y + 20;

            this.leftGun.setVisible(true);
            this.rightGun.setVisible(true);
        }
    }

    pointerDown(xloc, yloc) {
        offsetX = this.x - xloc;
        offsetY = this.y - yloc;
        this.isFiring = true;
    }

    pointerUp() {
        this.isFiring = false;
    }

    pointerMove(pointer) {
        let targetX;
        let targetY;

        if (pointer.isDown) {
            this.isFiring = true;
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

            this.x = targetX;
            this.y = targetY;
        } else if (Math.abs(this.x - targetX) <= 30
                             || Math.abs(this.y - targetY) <= 30) {
            this.setVelocityX(this.body.velocity.x / 1.1);
            this.setVelocityY(this.body.velocity.y / 1.1);
        }
    }
}
