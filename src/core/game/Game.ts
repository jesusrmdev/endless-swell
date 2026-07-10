/**
 * Game - Clase principal del juego
 *
 * Inicializa y gestiona el ciclo de vida del juego.
 * Phaser se utiliza únicamente como capa de infraestructura.
 */

import Phaser from 'phaser';
import { config } from '../config/Config';
import { BootScene } from '../../scenes/BootScene/BootScene';
import { PreloadScene } from '../../scenes/PreloadScene/PreloadScene';
import { MainMenuScene } from '../../scenes/MainMenuScene/MainMenuScene';
import { WorldScene } from '../../scenes/WorldScene/WorldScene';

export class Game {
  private phaserGame: Phaser.Game | null = null;
  private isRunning: boolean = false;

  constructor() {
    this.init();
  }

  /**
   * Inicializa el juego con la configuración por defecto
   */
  private init(): void {
    const gameConfig = config.getGameConfig();

    const phaserConfig: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: gameConfig.width,
      height: gameConfig.height,
      backgroundColor: gameConfig.backgroundColor,
      parent: 'game-container',
      scene: [
        BootScene,
        PreloadScene,
        MainMenuScene,
        WorldScene,
      ],
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { x: 0, y: 800 },
          debug: gameConfig.debug,
        },
      },
      render: {
        pixelArt: true,
        antialias: false,
        roundPixels: true,
      },
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
    };

    this.phaserGame = new Phaser.Game(phaserConfig);
    this.isRunning = true;

    console.log(`[Game] Endless Swell v${gameConfig.version} initialized`);
  }

  /**
   * Obtiene la instancia de Phaser.Game
   */
  getPhaserGame(): Phaser.Game | null {
    return this.phaserGame;
  }

  /**
   * Verifica si el juego está ejecutándose
   */
  isGameRunning(): boolean {
    return this.isRunning;
  }

  /**
   * Pausa el juego
   */
  pause(): void {
    if (this.phaserGame) {
      this.phaserGame.scene.scenes.forEach((scene) => {
        if (scene.scene.isActive()) {
          scene.scene.pause();
        }
      });
      this.isRunning = false;
      console.log('[Game] Game paused');
    }
  }

  /**
   * Reanuda el juego
   */
  resume(): void {
    if (this.phaserGame) {
      this.phaserGame.scene.scenes.forEach((scene) => {
        if (scene.scene.isPaused()) {
          scene.scene.resume();
        }
      });
      this.isRunning = true;
      console.log('[Game] Game resumed');
    }
  }

  /**
   * Destruye el juego y libera recursos
   */
  destroy(): void {
    if (this.phaserGame) {
      this.phaserGame.destroy(true);
      this.phaserGame = null;
      this.isRunning = false;
      console.log('[Game] Game destroyed');
    }
  }

  /**
   * Cambia a una escena específica
   * @param sceneKey - Identificador de la escena
   */
  switchScene(sceneKey: string): void {
    if (this.phaserGame) {
      const sceneManager = this.phaserGame.scene;
      // Detener todas las escenas activas
      sceneManager.getScenes(true).forEach((scene) => {
        sceneManager.stop(scene.scene.key);
      });
      // Iniciar la nueva escena
      sceneManager.start(sceneKey);
      console.log(`[Game] Switched to scene: ${sceneKey}`);
    }
  }
}
