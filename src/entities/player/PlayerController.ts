/**
 * PlayerController - Controlador del jugador
 *
 * Coordina InputService → MovementComponent → PlayerEntity.
 * Conecta la entrada del usuario con la lógica del juego.
 * Separado de Phaser - solo usa interfaces abstractas.
 */

import { PlayerEntity } from '@entities/player/PlayerEntity';
import { MovementComponent } from '@components/MovementComponent/MovementComponent';
import type { IInputService } from '@services/InputService/interfaces';
import type { PlayerConfig } from '@entities/player/types';

export class PlayerController {
  private player: PlayerEntity;
  private movement: MovementComponent;
  private inputService: IInputService;

  constructor(
    player: PlayerEntity,
    movement: MovementComponent,
    inputService: IInputService,
  ) {
    this.player = player;
    this.movement = movement;
    this.inputService = inputService;
  }

  /**
   * Inicializa el controlador con la configuración del jugador
   * @param config - Configuración del jugador desde datos
   */
  initialize(config: PlayerConfig): void {
    // Configurar MovementComponent con los datos del jugador
    this.movement.initialize({
      maxSpeed: config.movement.walkSpeed,
      acceleration: config.movement.acceleration,
      deceleration: config.movement.deceleration,
      walkSpeedMultiplier: 1,
      runSpeedMultiplier: 1.5,
    });

    // Establecer posición inicial desde config
    this.movement.setPosition({ x: config.spawn.x, y: config.spawn.y });
    this.player.setPosition(config.spawn.x, config.spawn.y);

    console.log('[PlayerController] Initialized');
  }

  /**
   * Actualiza el controlador cada frame
   * @param delta - Tiempo en milisegundos desde el último frame
   */
  update(delta: number): void {
    // Actualizar input service para leer estado del teclado
    this.inputService.update(delta);

    // Obtener input del usuario
    const inputState = this.inputService.getState();

    // Establecer dirección de movimiento
    this.movement.setDirection(inputState.moveDirection);

    // Establecer si está corriendo
    this.movement.setRunning(inputState.wantsToRun);

    // Actualizar movimiento
    this.movement.update(delta);

    // Sincronizar posición con la entidad del jugador
    const movementState = this.movement.getState();
    this.player.setPosition(movementState.position.x, movementState.position.y);

    // Actualizar estado del jugador
    this.player.setMoving(movementState.isMoving);
    this.player.setRunning(movementState.isRunning);

    // Determinar dirección del jugador (para animaciones futuras)
    if (movementState.isMoving) {
      this.updatePlayerDirection(movementState.velocity.x, movementState.velocity.y);
    }
  }

  /**
   * Actualiza la dirección del jugador basada en la velocidad
   * @param vx - Velocidad en X
   * @param vy - Velocidad en Y
   */
  private updatePlayerDirection(vx: number, vy: number): void {
    const absVx = Math.abs(vx);
    const absVy = Math.abs(vy);

    if (absVx > absVy) {
      this.player.setDirection(vx > 0 ? 'right' : 'left');
    } else if (absVy > absVx) {
      this.player.setDirection(vy > 0 ? 'down' : 'up');
    }
  }

  /**
   * Obtiene la posición actual del jugador
   */
  getPosition(): { x: number; y: number } {
    return this.movement.getPosition();
  }

  /**
   * Obtiene el estado del jugador
   */
  getPlayer(): PlayerEntity {
    return this.player;
  }

  /**
   * Obtiene el componente de movimiento
   */
  getMovement(): MovementComponent {
    return this.movement;
  }

  /**
   * Limpia recursos
   */
  destroy(): void {
    this.movement.destroy();
    this.inputService.destroy();
    console.log('[PlayerController] Destroyed');
  }
}
