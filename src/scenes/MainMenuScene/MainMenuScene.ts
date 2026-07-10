/**
 * MainMenuScene - Escena del menú principal
 *
 * Muestra el menú principal con opciones para jugar, opciones y salir.
 */

import Phaser from 'phaser';
import { SCENE_KEYS } from '@core/constants/Constants';

export class MainMenuScene extends Phaser.Scene {
  constructor() {
    super({ key: SCENE_KEYS.MAIN_MENU });
  }

  create(): void {
    console.log('[MainMenuScene] Main menu loaded');

    const { width, height } = this.cameras.main;

    // Fondo
    this.cameras.main.setBackgroundColor('#1a1a2e');

    // Título del juego
    const title = this.add.text(width / 2, height / 3, 'ENDLESS SWELL', {
      fontFamily: 'Arial',
      fontSize: '48px',
      color: '#1e90ff',
      fontStyle: 'bold',
    });
    title.setOrigin(0.5, 0.5);

    // Subtítulo
    const subtitle = this.add.text(width / 2, height / 3 + 60, 'Surf & Travel RPG', {
      fontFamily: 'Arial',
      fontSize: '20px',
      color: '#888888',
    });
    subtitle.setOrigin(0.5, 0.5);

    // Botón de jugar
    const playButton = this.add.text(width / 2, height / 2 + 50, 'JUGAR', {
      fontFamily: 'Arial',
      fontSize: '24px',
      color: '#ffffff',
      backgroundColor: '#1e90ff',
      padding: { x: 20, y: 10 },
    });
    playButton.setOrigin(0.5, 0.5);
    playButton.setInteractive({ useHandCursor: true });

    playButton.on('pointerover', () => {
      playButton.setStyle({ backgroundColor: '#4169e1' });
    });

    playButton.on('pointerout', () => {
      playButton.setStyle({ backgroundColor: '#1e90ff' });
    });

    playButton.on('pointerdown', () => {
      console.log('[MainMenuScene] Starting game');
      this.scene.start(SCENE_KEYS.WORLD);
    });

    // Botón de opciones
    const optionsButton = this.add.text(width / 2, height / 2 + 110, 'OPCIONES', {
      fontFamily: 'Arial',
      fontSize: '20px',
      color: '#888888',
    });
    optionsButton.setOrigin(0.5, 0.5);
    optionsButton.setInteractive({ useHandCursor: true });

    optionsButton.on('pointerover', () => {
      optionsButton.setStyle({ color: '#ffffff' });
    });

    optionsButton.on('pointerout', () => {
      optionsButton.setStyle({ color: '#888888' });
    });

    optionsButton.on('pointerdown', () => {
      console.log('[MainMenuScene] Options clicked');
    });

    // Versión
    const version = this.add.text(width - 10, height - 10, 'v0.1.0', {
      fontFamily: 'Arial',
      fontSize: '12px',
      color: '#555555',
    });
    version.setOrigin(1, 1);
  }
}
