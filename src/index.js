// eslint-disable-next-line spaced-comment
/// <reference path="../typings/phaser.d.ts" />

import Phaser from 'phaser';
import config from './config';
import BootScene from './scenes/BootScene';
import PreLoaderScene from './scenes/PreLoaderScene';
import GameScene from './scenes/GameScene';
import TitleScene from './scenes/TitleScene';


class Game extends Phaser.Game {
    constructor() {
        super(config);
        this.scene.add('BootScene', BootScene);
        this.scene.add('PreLoaderScene', PreLoaderScene);
        this.scene.add('GameScene', GameScene);
        this.scene.add('TitleScene', TitleScene);


        this.scene.start('BootScene');
    }
}

function startGame() {
    window.game = new Game();
}

window.onload = startGame();
