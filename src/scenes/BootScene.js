import Phaser from 'phaser';
import imgLogo from '../assets/iclogo.png';


export default class BootScene extends Phaser.Scene {
    constructor() {
        super('BootScene');
    }

    preload() {
        this.load.image('iclogo', imgLogo);
    }

    create() {
        this.scene.start('PreLoaderScene');
    }
}
