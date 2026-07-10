/**
 * SurfScene - Escena de surf
 *
 * Escena dedicada al gameplay de surf.
 * Placeholder para v0.8 (Surf).
 */

import Phaser from 'phaser';
import { SCENE_KEYS } from '@core/constants/Constants';

export class SurfScene extends Phaser.Scene {
  constructor() {
    super({ key: SCENE_KEYS.SURF });
  }

  create(): void {
    console.log('[SurfScene] Surf scene loaded');

    const { width, height } = this.cameras.main;

    // Fondo temporal
    this.cameras.main.setBackgroundColor('#0a1628');

    // Mensaje placeholder
    const placeholderText = this.add.text(width / 2, height / 2, 'SURF\n\nv0.8', {
      fontFamily: 'Arial',
      fontSize: '32px',
      color: '#1e90ff',
      align: 'center',
    });
    placeholderText.setOrigin(0.5, 0.5);

    // Instrucción
    const instructionText = this.add.text(width / 2, height / 2 + 100, 'Presiona ESC para volver', {
      fontFamily: 'Arial',
      fontSize: '16px',
      color: '#888888',
    });
    instructionText.setOrigin(0.5, 0.5);

    // Tecla ESC para volver
    this.input.keyboard?.on('keydown-ESC', () => {
      this.scene.start(SCENE_KEYS.WORLD);
    });
  }
}
