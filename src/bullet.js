import Phaser from 'phaser';


export default class Bullet extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y);
        this.speedX = Phaser.Math.GetSpeed(1000, 1);
        this.speedY = 0;
    }

    fire(x, y, texture, speedX, speedY) {
        this.setPosition(x + 50, y);
        this.setTexture(texture);
        this.setActive(true);
        this.setVisible(true);
        if (speedY) this.setRotation(Phaser.Math.GetSpeed(speedY, 1));
        this.speedX = speedX === undefined ? 0 : Phaser.Math.GetSpeed(speedX, 1);
        this.speedY = speedY === undefined ? 0 : Phaser.Math.GetSpeed(speedY, 1);
    }

    update(time, delta) {
        this.y -= this.speedY * delta;
        this.x += this.speedX * delta;

        if (this.y < -50 || this.y > 600 || this.x < -50 || this.x > 1068) {
            this.setActive(false);
            this.setVisible(false);
        }
    }
}
