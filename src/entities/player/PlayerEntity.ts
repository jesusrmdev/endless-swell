/**
 * PlayerEntity - Entidad del jugador
 *
 * Entidad pura de datos, completamente independiente de Phaser.
 * Contiene el estado del jugador y métodos para manipularlo.
 *
 * Esta entidad NO maneja movimiento directamente.
 * El movimiento se gestiona a través de MovementComponent.
 */

import type { PlayerConfig, PlayerState, PlayerDirection, PlayerStatus } from './types';

export class PlayerEntity {
  private state: PlayerState;

  constructor(config: PlayerConfig) {
    this.state = {
      config: { ...config },
      position: { x: config.spawn.x, y: config.spawn.y },
      direction: 'down',
      status: 'idle',
      isMoving: false,
      isRunning: false,
      energy: config.stats.energy,
      health: config.stats.health,
    };
  }

  /**
   * Obtiene el estado completo del jugador
   */
  getState(): PlayerState {
    return {
      ...this.state,
      config: { ...this.state.config },
      position: { ...this.state.position },
    };
  }

  /**
   * Obtiene la configuración del jugador
   */
  getConfig(): PlayerConfig {
    return { ...this.state.config };
  }

  /**
   * Obtiene la posición actual
   */
  getPosition(): { x: number; y: number } {
    return { ...this.state.position };
  }

  /**
   * Establece la posición del jugador
   * @param x - Coordenada X
   * @param y - Coordenada Y
   */
  setPosition(x: number, y: number): void {
    this.state.position = { x, y };
  }

  /**
   * Actualiza la posición del jugador (para uso externo)
   * @param x - Nueva coordenada X
   * @param y - Nueva coordenada Y
   */
  updatePosition(x: number, y: number): void {
    this.state.position = { x, y };
  }

  /**
   * Obtiene la dirección actual
   */
  getDirection(): PlayerDirection {
    return this.state.direction;
  }

  /**
   * Establece la dirección del jugador
   * @param direction - Nueva dirección
   */
  setDirection(direction: PlayerDirection): void {
    this.state.direction = direction;
  }

  /**
   * Obtiene el estado actual del jugador
   */
  getStatus(): PlayerStatus {
    return this.state.status;
  }

  /**
   * Establece el estado del jugador
   * @param status - Nuevo estado
   */
  setStatus(status: PlayerStatus): void {
    this.state.status = status;
  }

  /**
   * Establece si el jugador se está moviendo
   * @param moving - true si se está moviendo
   */
  setMoving(moving: boolean): void {
    this.state.isMoving = moving;
  }

  /**
   * Establece si el jugador está corriendo
   * @param running - true si está corriendo
   */
  setRunning(running: boolean): void {
    this.state.isRunning = running;
  }

  /**
   * Obtiene la energía actual
   */
  getEnergy(): number {
    return this.state.energy;
  }

  /**
   * Establece la energía del jugador
   * @param energy - Nueva energía (0-100)
   */
  setEnergy(energy: number): void {
    this.state.energy = Math.max(0, Math.min(100, energy));
  }

  /**
   * Obtiene la salud actual
   */
  getHealth(): number {
    return this.state.health;
  }

  /**
   * Establece la salud del jugador
   * @param health - Nueva salud (0-100)
   */
  setHealth(health: number): void {
    this.state.health = Math.max(0, Math.min(100, health));
  }

  /**
   * Verifica si el jugador está vivo
   */
  isAlive(): boolean {
    return this.state.health > 0;
  }

  /**
   * Resetea el jugador a su estado por defecto
   * @param spawnX - Posición X de spawn
   * @param spawnY - Posición Y de spawn
   */
  reset(spawnX: number = 0, spawnY: number = 0): void {
    this.state.position = { x: spawnX, y: spawnY };
    this.state.direction = 'down';
    this.state.status = 'idle';
    this.state.isMoving = false;
    this.state.isRunning = false;
    this.state.energy = 100;
    this.state.health = 100;
  }
}
