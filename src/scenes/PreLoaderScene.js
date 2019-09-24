import Phaser from 'phaser';
import playerShip from '../assets/ship.png';
import shipAtlas from '../assets/ship.json';
import logo from '../assets/logo.png';
import bg1 from '../assets/BGlayer0.png';
import bg2 from '../assets/BGlayer1.png';


export default class PreLoaderScene extends Phaser.Scene {
    constructor() {
        super('PreLoaderScene');
        this.readyCount = 0;
    }

    preload() {
        // Loading Screen with Progress Bar
        const { width } = this.cameras.main;
        const { height } = this.cameras.main;

        this.add.image(width / 2, height / 2 - 100, 'iclogo');

        const progressBar = this.add.graphics();
        const progressBox = this.add.graphics();

        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(width / 2 - 160, height / 2 - 30, 320, 50);

        this.load.on('progress', (value) => {
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(width / 2 - 150, height / 2 - 20, 300 * value, 30);
        });

        // Clean up when finished and move on
        this.load.on('complete', () => {
            progressBar.destroy();
            progressBox.destroy();
            this.ready();
        });

        this.timedEvent = this.time.delayedCall(3000, this.ready, [], this);

        // Load the Assets (you know, the whole reason we are here anyway)
        this.load.atlas('myShip', playerShip, shipAtlas);
        this.load.image('playerShip', playerShip);
        this.load.image('logo', logo);
        this.load.image('bg1', bg1);
        this.load.image('bg2', bg2);
    }

    ready() {
        this.readyCount++;
        if (this.readyCount >= 2) {
            this.scene.start('TitleScene');
        }
    }
}
