/**
 * UIScene - Escena de interfaz
 *
 * HUD superpuesto a otras escenas.
 * Placeholder para v0.2 (Movimiento).
 */

import Phaser from 'phaser';
import { SCENE_KEYS } from '@core/constants/Constants';

export class UIScene extends Phaser.Scene {
  constructor() {
    super({ key: SCENE_KEYS.UI });
  }

  create(): void {
    console.log('[UIScene] UI scene loaded');

    // Placeholder: UI vacía
    // En futuras versiones se implementará el HUD aquí
  }
}
