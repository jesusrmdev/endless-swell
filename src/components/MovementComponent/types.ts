/**
 * MovementComponent - Tipos del componente de movimiento
 *
 * Define los tipos de datos para el sistema de movimiento reutilizable.
 * Este componente puede ser usado por jugador, NPCs, vehículos, etc.
 */

/**
 * Dirección de movimiento
 */
export interface Vector2D {
  x: number;
  y: number;
}

/**
 * Configuración de movimiento de una entidad
 */
export interface MovementConfig {
  /** Velocidad máxima en píxeles por segundo */
  maxSpeed: number;
  /** Aceleración en píxeles por segundo² */
  acceleration: number;
  /** Desaceleración (fricción) en píxeles por segundo² */
  deceleration: number;
  /** Velocidad máxima al caminar (porcentaje de maxSpeed) */
  walkSpeedMultiplier: number;
  /** Velocidad máxima al correr (porcentaje de maxSpeed) */
  runSpeedMultiplier: number;
}

/**
 * Estado de movimiento de una entidad
 */
export interface MovementState {
  /** Posición actual */
  position: Vector2D;
  /** Velocidad actual */
  velocity: Vector2D;
  /** Dirección en la que se mueve la entidad */
  direction: Vector2D;
  /** Si la entidad se está moviendo */
  isMoving: boolean;
  /** Si la entidad está corriendo */
  isRunning: boolean;
  /** Ángulo de rotación en grados */
  rotation: number;
}
