/**
 * MovementComponent - Componente de movimiento reutilizable
 *
 * Maneja la lógica de movimiento para cualquier entidad del juego.
 * Independiente de Phaser - solo trabaja con datos numéricos.
 *
 * @example
 * ```typescript
 * const movement = new MovementComponent();
 * movement.initialize({ maxSpeed: 150, acceleration: 600, ... });
 * movement.setDirection({ x: 1, y: 0 });
 * movement.update(delta);
 * const pos = movement.getPosition();
 * ```
 */

import type { IMovementComponent } from './interfaces';
import type { MovementConfig, MovementState, Vector2D } from './types';

export class MovementComponent implements IMovementComponent {
  private config: MovementConfig = {
    maxSpeed: 150,
    acceleration: 600,
    deceleration: 400,
    walkSpeedMultiplier: 1,
    runSpeedMultiplier: 1.5,
  };

  private state: MovementState = {
    position: { x: 0, y: 0 },
    velocity: { x: 0, y: 0 },
    direction: { x: 0, y: 0 },
    isMoving: false,
    isRunning: false,
    rotation: 0,
  };

  initialize(config: MovementConfig): void {
    this.config = { ...config };
    console.log('[MovementComponent] Initialized');
  }

  update(delta: number): void {
    const deltaSeconds = delta / 1000;

    // Calcular velocidad objetivo basada en dirección
    const targetSpeed = this.state.isRunning
      ? this.config.maxSpeed * this.config.runSpeedMultiplier
      : this.config.maxSpeed * this.config.walkSpeedMultiplier;

    const targetVelocity: Vector2D = {
      x: this.state.direction.x * targetSpeed,
      y: this.state.direction.y * targetSpeed,
    };

    // Aplicar aceleración o desaceleración
    if (this.state.direction.x !== 0 || this.state.direction.y !== 0) {
      // Acelerar hacia la velocidad objetivo
      this.state.velocity.x = this.approach(
        this.state.velocity.x,
        targetVelocity.x,
        this.config.acceleration * deltaSeconds
      );
      this.state.velocity.y = this.approach(
        this.state.velocity.y,
        targetVelocity.y,
        this.config.acceleration * deltaSeconds
      );
    } else {
      // Desacelerar hasta detenerse
      this.state.velocity.x = this.approach(
        this.state.velocity.x,
        0,
        this.config.deceleration * deltaSeconds
      );
      this.state.velocity.y = this.approach(
        this.state.velocity.y,
        0,
        this.config.deceleration * deltaSeconds
      );
    }

    // Actualizar posición
    this.state.position.x += this.state.velocity.x * deltaSeconds;
    this.state.position.y += this.state.velocity.y * deltaSeconds;

    // Actualizar estado
    this.state.isMoving =
      Math.abs(this.state.velocity.x) > 0.1 || Math.abs(this.state.velocity.y) > 0.1;

    // Calcular rotación basada en velocidad
    if (this.state.isMoving) {
      this.state.rotation = Math.atan2(this.state.velocity.y, this.state.velocity.x);
    }
  }

  setDirection(direction: Vector2D): void {
    // Normalizar la dirección
    const length = Math.sqrt(direction.x * direction.x + direction.y * direction.y);
    if (length > 0) {
      this.state.direction = {
        x: direction.x / length,
        y: direction.y / length,
      };
    } else {
      this.state.direction = { x: 0, y: 0 };
    }
  }

  setRunning(running: boolean): void {
    this.state.isRunning = running;
  }

  getState(): MovementState {
    return {
      position: { ...this.state.position },
      velocity: { ...this.state.velocity },
      direction: { ...this.state.direction },
      isMoving: this.state.isMoving,
      isRunning: this.state.isRunning,
      rotation: this.state.rotation,
    };
  }

  setPosition(position: Vector2D): void {
    this.state.position = { ...position };
  }

  stop(): void {
    this.state.velocity = { x: 0, y: 0 };
    this.state.direction = { x: 0, y: 0 };
    this.state.isMoving = false;
  }

  getPosition(): Vector2D {
    return { ...this.state.position };
  }

  isMoving(): boolean {
    return this.state.isMoving;
  }

  destroy(): void {
    console.log('[MovementComponent] Destroyed');
  }

  /**
   * Aproxima un valor hacia un objetivo
   * @param current - Valor actual
   * @param target - Valor objetivo
   * @param maxChange - Cambio máximo permitido
   * @returns Nuevo valor
   */
  private approach(current: number, target: number, maxChange: number): number {
    const diff = target - current;
    if (Math.abs(diff) <= maxChange) {
      return target;
    }
    return current + Math.sign(diff) * maxChange;
  }
}
