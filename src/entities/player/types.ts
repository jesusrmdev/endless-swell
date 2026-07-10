/**
 * PlayerEntity - Tipos del jugador
 *
 * Define los tipos de datos para la entidad del jugador.
 * Estos tipos son independientes de Phaser.
 */

/**
 * Dirección del jugador
 */
export type PlayerDirection = 'down' | 'up' | 'left' | 'right';

/**
 * Estado del jugador
 */
export type PlayerStatus = 'idle' | 'walking' | 'running' | 'surfing' | 'driving' | 'interacting';

/**
 * Configuración del jugador cargada desde datos
 */
export interface PlayerConfig {
  /** Identificador único del jugador */
  id: string;
  /** Nombre del jugador */
  name: string;
  /** Descripción del jugador */
  description: string;
  /** Estadísticas del jugador */
  stats: {
    health: number;
    maxHealth: number;
    energy: number;
    maxEnergy: number;
    surfSkill: number;
    maxSurfSkill: number;
  };
  /** Configuración de movimiento */
  movement: {
    walkSpeed: number;
    runSpeed: number;
    acceleration: number;
    deceleration: number;
  };
  /** Apariencia del jugador */
  appearance: {
    sprite: string;
    spriteWidth: number;
    spriteHeight: number;
    scale: number;
  };
  /** Punto de aparición del jugador */
  spawn: {
    x: number;
    y: number;
    map: string;
  };
}

/**
 * Estado completo del jugador
 */
export interface PlayerState {
  /** Configuración del jugador */
  config: PlayerConfig;
  /** Posición actual */
  position: { x: number; y: number };
  /** Dirección actual */
  direction: PlayerDirection;
  /** Estado actual */
  status: PlayerStatus;
  /** Si el jugador se está moviendo */
  isMoving: boolean;
  /** Si el jugador está corriendo */
  isRunning: boolean;
  /** Energía actual (0-100) */
  energy: number;
  /** Salud actual (0-100) */
  health: number;
}
