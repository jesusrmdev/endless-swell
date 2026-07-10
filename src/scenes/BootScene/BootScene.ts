/**
 * BootScene - Escena de arranque
 *
 * Primera escena que se ejecuta. Carga la configuración mínima
 * y transiciona a PreloadScene.
 */

import Phaser from 'phaser';
import { SCENE_KEYS } from '@core/constants/Constants';

export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: SCENE_KEYS.BOOT });
  }

  preload(): void {
    // Cargar assets mínimos para la pantalla de carga
    this.createLoadingGraphics();
  }

  create(): void {
    console.log('[BootScene] Boot complete');

    // Transición a PreloadScene
    this.scene.start(SCENE_KEYS.PRELOAD);
  }

  private createLoadingGraphics(): void {
    // Crear gráficos básicos para la barra de carga
    const graphics = this.add.graphics();

    // Fondo de la barra de carga
    graphics.fillStyle(0x333333, 1);
    graphics.fillRect(0, 0, 400, 30);

    // Borde de la barra de carga
    graphics.lineStyle(2, 0xffffff, 1);
    graphics.strokeRect(0, 0, 400, 30);

    graphics.destroy();
  }
}
