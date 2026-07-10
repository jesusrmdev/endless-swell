/**
 * InputService - Tipos del servicio de entrada
 *
 * Define los tipos de datos para el sistema de entrada.
 */

/**
 * Teclas soportadas por el juego
 */
export type GameKey =
  | 'arrow_up'
  | 'arrow_down'
  | 'arrow_left'
  | 'arrow_right'
  | 'w'
  | 'a'
  | 's'
  | 'd'
  | 'shift'
  | 'space'
  | 'enter'
  | 'escape'
  | 'e'
  | 'i'
  | 'm'
  | 'j';

/**
 * Estado de una tecla
 */
export interface KeyState {
  /** Si la tecla está presionada actualmente */
  isDown: boolean;
  /** Si la tecla se acaba de presionar (este frame) */
  justPressed: boolean;
  /** Si la tecla se acaba de soltar (este frame) */
  justReleased: boolean;
}

/**
 * Estado del input
 */
export interface InputState {
  /** Estado de todas las teclas */
  keys: Record<GameKey, KeyState>;
  /** Dirección de movimiento calculada del input */
  moveDirection: { x: number; y: number };
  /** Si el jugador quiere correr */
  wantsToRun: boolean;
}
