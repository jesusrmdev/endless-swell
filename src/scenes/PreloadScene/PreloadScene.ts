/**
 * PreloadScene - Escena de carga de assets
 *
 * Muestra una barra de carga mientras se cargan los assets del juego.
 */

import Phaser from 'phaser';
import { SCENE_KEYS } from '@core/constants/Constants';

export class PreloadScene extends Phaser.Scene {
  private progressBar!: Phaser.GameObjects.Graphics;
  private progressBox!: Phaser.GameObjects.Graphics;
  private loadingText!: Phaser.GameObjects.Text;
  private percentText!: Phaser.GameObjects.Text;

  constructor() {
    super({ key: SCENE_KEYS.PRELOAD });
  }

  preload(): void {
    this.createLoadingUI();

    // Simular carga de assets (reemplazar con carga real)
    this.load.on('progress', (value: number) => {
      this.updateProgress(value);
    });

    this.load.on('complete', () => {
      this.onLoadComplete();
    });

    // Simular carga
    this.load.image('dummy', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==');
  }

  create(): void {
    console.log('[PreloadScene] Assets loaded');

    // Transición a MainMenuScene
    this.scene.start(SCENE_KEYS.MAIN_MENU);
  }

  private createLoadingUI(): void {
    const { width, height } = this.cameras.main;

    // Fondo
    this.cameras.main.setBackgroundColor('#1a1a2e');

    // Barra de progreso
    this.progressBox = this.add.graphics();
    this.progressBox.fillStyle(0x333333, 1);
    this.progressBox.fillRect(width / 2 - 160, height / 2 - 15, 320, 30);

    // Barra de progreso
    this.progressBar = this.add.graphics();

    // Texto de carga
    this.loadingText = this.add.text(width / 2, height / 2 - 50, 'Cargando...', {
      fontFamily: 'Arial',
      fontSize: '20px',
      color: '#ffffff',
    });
    this.loadingText.setOrigin(0.5, 0.5);

    // Texto de porcentaje
    this.percentText = this.add.text(width / 2, height / 2, '0%', {
      fontFamily: 'Arial',
      fontSize: '14px',
      color: '#ffffff',
    });
    this.percentText.setOrigin(0.5, 0.5);
  }

  private updateProgress(value: number): void {
    const { width, height } = this.cameras.main;

    this.progressBar.clear();
    this.progressBar.fillStyle(0x1e90ff, 1);
    this.progressBar.fillRect(width / 2 - 155, height / 2 - 10, 310 * value, 20);

    this.percentText.setText(`${Math.round(value * 100)}%`);
  }

  private onLoadComplete(): void {
    this.loadingText.setText('¡Listo!');
  }
}
