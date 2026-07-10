/**
 * DebugScene - Escena de debug
 *
 * Herramientas de desarrollo y debug.
 * Solo visible en modo desarrollo.
 */

import Phaser from 'phaser';
import { SCENE_KEYS } from '@core/constants/Constants';
import { config } from '@core/config/Config';

export class DebugScene extends Phaser.Scene {
  constructor() {
    super({ key: SCENE_KEYS.DEBUG });
  }

  create(): void {
    console.log('[DebugScene] Debug scene loaded');

    // Solo mostrar en modo debug
    if (!config.getGameConfig().debug) {
      this.scene.stop();
      return;
    }

    const { width, height } = this.cameras.main;

    // Fondo semi-transparente
    const background = this.add.rectangle(0, 0, width, height, 0x000000, 0.8);
    background.setOrigin(0, 0);

    // Título
    this.add.text(20, 20, 'DEBUG MODE', {
      fontFamily: 'Arial',
      fontSize: '24px',
      color: '#ff0000',
      fontStyle: 'bold',
    });

    // Info del juego
    const gameInfo = this.add.text(20, 60, `FPS: ${this.game.loop.actualFps.toFixed(1)}`, {
      fontFamily: 'Arial',
      fontSize: '14px',
      color: '#00ff00',
    });

    // Actualizar FPS cada frame
    this.events.on('update', () => {
      gameInfo.setText(`FPS: ${this.game.loop.actualFps.toFixed(1)}`);
    });

    // Tecla para cerrar
    const closeText = this.add.text(width - 20, 20, 'Press F3 to close', {
      fontFamily: 'Arial',
      fontSize: '14px',
      color: '#888888',
    });
    closeText.setOrigin(1, 0);

    this.input.keyboard?.on('keydown-F3', () => {
      this.scene.stop();
    });
  }
}
