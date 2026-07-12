/**
 * TransitionService - Interfaces
 *
 * Define los tipos para el sistema de transiciones.
 */

/**
 * Tipo de efecto de transición
 */
export type TransitionEffectType = 'fade' | 'wipe' | 'none';

/**
 * Dirección de transición
 */
export type TransitionDirection = 'left' | 'right' | 'up' | 'down';

/**
 * Configuración de una transición
 */
export interface TransitionConfig {
  /** Tipo de efecto */
  effect: TransitionEffectType;
  /** Duración en milisegundos */
  duration: number;
  /** Color de fundido (para fade) */
  color?: number;
  /** Dirección (para wipe) */
  direction?: TransitionDirection;
  /** Callback al inicio de la transición */
  onStart?: () => void;
  /** Callback al final de la transición */
  onComplete?: () => void;
}

/**
 * Resultado de una transición
 */
export interface TransitionResult {
  /** Si la transición se completó */
  success: boolean;
  /** Mensaje de error si falló */
  error?: string;
}

/**
 * Interfaz principal del TransitionService
 */
export interface ITransitionService {
  /** Inicializa el servicio */
  initialize(scene: Phaser.Scene): void;

  /** Fundido a negro */
  fadeToBlack(duration?: number, color?: number): Promise<TransitionResult>;

  /** Fundido desde negro */
  fadeFromBlack(duration?: number, color?: number): Promise<TransitionResult>;

  /** Transición wipe horizontal */
  wipeTransition(direction: TransitionDirection, duration?: number): Promise<TransitionResult>;

  /** Transición completa de mapa */
  transitionToMap(mapKey: string, spawnPoint: string): Promise<TransitionResult>;

  /** Verifica si hay una transición en curso */
  isTransitioning(): boolean;

  /** Limpia recursos */
  destroy(): void;
}
