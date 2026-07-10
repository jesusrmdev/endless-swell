/**
 * WorldScene - Escena del mundo
 *
 * Escena principal de exploración del mundo.
 * Coordina sistemas de movimiento, entrada y entidades.
 */

import Phaser from 'phaser';
import { SCENE_KEYS, DEPTHS } from '@core/constants/Constants';
import { PlayerEntity, PlayerController } from '@entities/player';
import type { PlayerConfig } from '@entities/player/types';
import { MovementComponent } from '@components/MovementComponent';
import { InputService } from '@services/InputService';
import playerData from '@data/entities/player.default.json';

export class WorldScene extends Phaser.Scene {
  private playerController!: PlayerController;
  private playerSprite!: Phaser.GameObjects.Sprite;

  constructor() {
    super({ key: SCENE_KEYS.WORLD });
  }

  create(): void {
    console.log('[WorldScene] World scene loaded');

    // Fondo temporal
    this.cameras.main.setBackgroundColor('#1a1a2e');

    // Cargar datos del jugador
    const config = playerData as PlayerConfig;

    // Crear componentes
    const playerEntity = new PlayerEntity(config);
    const movementComponent = new MovementComponent();
    const inputService = new InputService();

    // Inicializar input service
    inputService.initialize(this);

    // Crear sprite del jugador
    this.playerSprite = this.add.sprite(
      config.spawn.x,
      config.spawn.y,
      'player-placeholder',
    );
    this.playerSprite.setDepth(DEPTHS.PLAYER);

    // Crear controlador del jugador
    this.playerController = new PlayerController(
      playerEntity,
      movementComponent,
      inputService,
    );
    this.playerController.initialize(config);

    // Cámara sigue al jugador
    this.cameras.main.startFollow(this.playerSprite, true, 0.1, 0.1);

    // Instrucciones
    const instructionText = this.add.text(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2,
      'Flechas/WASD: Mover | SHIFT: Correr | ESC: Volver al menú',
      {
        fontFamily: 'Arial',
        fontSize: '12px',
        color: '#888888',
      },
    );
    instructionText.setOrigin(0.5, 0.5);
    instructionText.setScrollFactor(0);
    instructionText.setDepth(DEPTHS.UI);

    // Tecla ESC para volver
    this.input.keyboard?.on('keydown-ESC', () => {
      this.scene.start(SCENE_KEYS.MAIN_MENU);
    });
  }

  update(_time: number, delta: number): void {
    // Actualizar controlador del jugador
    this.playerController.update(delta);

    // Sincronizar sprite con posición del jugador
    const position = this.playerController.getPosition();
    this.playerSprite.setPosition(position.x, position.y);
  }

  shutdown(): void {
    // Limpiar recursos
    if (this.playerController) {
      this.playerController.destroy();
    }
    console.log('[WorldScene] World scene shutdown');
  }
}
