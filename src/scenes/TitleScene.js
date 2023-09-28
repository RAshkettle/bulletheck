import Phaser from 'phaser';


export default class TitleScene extends Phaser.Scene {
    constructor() {
        super('TitleScene');
    }

    create() {
        this.createTitle();
    }

    createTitle() {
        // Loading Screen with Progress Bar
        const { width } = this.cameras.main;
        const { height } = this.cameras.main;
        this.titleImage = this.add.image(width / 2, height / 2 - 100, 'logo');
        this.titleImage.setScale(0.5, 0.5);

        this.gameText = this.add.text(width / 2, height / 2, 'Touch screen to start...', { fontSize: '32px', fill: '#fff' });
        this.input.on('pointerdown', () => {
            this.scale.startFullscreen();
            this.scene.start('GameScene');
        });
    }
}
