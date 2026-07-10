/**
 * InteriorScene - Escena de interiores
 *
 * Escena para interiores (tiendas, casas, academias).
 * Placeholder para v0.6 (NPC).
 */

import Phaser from 'phaser';
import { SCENE_KEYS } from '@core/constants/Constants';

export class InteriorScene extends Phaser.Scene {
  constructor() {
    super({ key: SCENE_KEYS.INTERIOR });
  }

  create(): void {
    console.log('[InteriorScene] Interior scene loaded');

    const { width, height } = this.cameras.main;

    // Fondo temporal
    this.cameras.main.setBackgroundColor('#2d2d2d');

    // Mensaje placeholder
    const placeholderText = this.add.text(width / 2, height / 2, 'INTERIOR\n\nv0.6', {
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
