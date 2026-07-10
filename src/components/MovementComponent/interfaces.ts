/**
 * MovementComponent - Interfaces del componente de movimiento
 *
 * Define el contrato del componente de movimiento reutilizable.
 */

import type { MovementConfig, MovementState, Vector2D } from './types';

/**
 * Interfaz del componente de movimiento
 *
 * Responsabilidades:
 * - Calcular movimiento basado en input
 * - Aplicar aceleración/desaceleración
 * - Respetar límites de velocidad
 * - Actualizar posición
 */
export interface IMovementComponent {
  /**
   * Inicializa el componente con configuración
   * @param config - Configuración de movimiento
   */
  initialize(config: MovementConfig): void;

  /**
   * Actualiza el estado del movimiento
   * @param delta - Tiempo desde la última actualización en ms
   */
  update(delta: number): void;

  /**
   * Establece la dirección de movimiento deseada
   * @param direction - Dirección normalizada (-1, 0, 1)
   */
  setDirection(direction: Vector2D): void;

  /**
   * Establece si la entidad debe correr
   * @param running - true para correr, false para caminar
   */
  setRunning(running: boolean): void;

  /**
   * Obtiene el estado actual del movimiento
   * @returns Estado del movimiento
   */
  getState(): MovementState;

  /**
   * Establece la posición directamente
   * @param position - Nueva posición
   */
  setPosition(position: Vector2D): void;

  /**
   * Detiene el movimiento completamente
   */
  stop(): void;

  /**
   * Obtiene la posición actual
   * @returns Posición actual
   */
  getPosition(): Vector2D;

  /**
   * Verifica si la entidad se está moviendo
   * @returns true si se está moviendo
   */
  isMoving(): boolean;

  /**
   * Destruye el componente y libera recursos
   */
  destroy(): void;
}
