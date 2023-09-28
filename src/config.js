import Phaser from 'phaser';

export default {
    type: Phaser.AUTO,
    backgroundColor: 0x000000,
    parent: 'phaser-game',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1068,
        height: 600,
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0, x: 0 },
            debug: false,
        },
    },
    fps: {
        target: 60,
        min: 30,
        forceSetTimeOut: true,
    }
};
