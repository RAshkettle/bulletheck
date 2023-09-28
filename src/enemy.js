import Phaser from 'phaser';

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, hp, damage) {
        super(scene, x, y, texture);
        this.hitPoints = hp;
        this.damage = damage;
        scene.add.existing(this);
        scene.physics.add.existing(this);
    }
}
