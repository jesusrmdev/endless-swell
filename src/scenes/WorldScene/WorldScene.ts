/**
 * WorldScene - Escena del mundo
 *
 * Escena principal de exploración del mundo.
 * Placeholder para v0.4 (Mundo).
 */

import Phaser from 'phaser';
import { SCENE_KEYS } from '@core/constants/Constants';

export class WorldScene extends Phaser.Scene {
  constructor() {
    super({ key: SCENE_KEYS.WORLD });
  }

  create(): void {
    console.log('[WorldScene] World scene loaded');

    const { width, height } = this.cameras.main;

    // Fondo temporal
    this.cameras.main.setBackgroundColor('#1a1a2e');

    // Mensaje placeholder
    const placeholderText = this.add.text(width / 2, height / 2, 'MUNDO\n\nv0.4', {
      fontFamily: 'Arial',
      fontSize: '32px',
      color: '#1e90ff',
      align: 'center',
    });
    placeholderText.setOrigin(0.5, 0.5);

    // Instrucción
    const instructionText = this.add.text(width / 2, height / 2 + 100, 'Presiona ESC para volver al menú', {
      fontFamily: 'Arial',
      fontSize: '16px',
      color: '#888888',
    });
    instructionText.setOrigin(0.5, 0.5);

    // Tecla ESC para volver
    this.input.keyboard?.on('keydown-ESC', () => {
      this.scene.start(SCENE_KEYS.MAIN_MENU);
    });
  }
}
