/**
 * InputService - Interfaces del servicio de entrada
 */

import type { InputState, GameKey } from './types';

/**
 * Interfaz del servicio de entrada
 *
 * Responsabilidades:
 * - Capturar input del teclado
 * - Procesar direcciones de movimiento
 * - Detectar pulsaciones de teclas
 */
export interface IInputService {
  /**
   * Inicializa el servicio con un juego de Phaser
   * @param scene - Escena de Phaser para capturar input
   */
  initialize(scene: Phaser.Scene): void;

  /**
   * Actualiza el estado del input
   * @param delta - Tiempo desde la última actualización en ms
   */
  update(delta: number): void;

  /**
   * Obtiene el estado actual del input
   * @returns Estado del input
   */
  getState(): InputState;

  /**
   * Verifica si una tecla está presionada
   * @param key - Tecla a verificar
   * @returns true si está presionada
   */
  isKeyDown(key: GameKey): boolean;

  /**
   * Verifica si una tecla se acaba de presionar
   * @param key - Tecla a verificar
   * @returns true si se acaba de presionar
   */
  isKeyJustPressed(key: GameKey): boolean;

  /**
   * Verifica si una tecla se acaba de soltar
   * @param key - Tecla a verificar
   * @returns true si se acaba de soltar
   */
  isKeyJustReleased(key: GameKey): boolean;

  /**
   * Obtiene la dirección de movimiento calculada
   * @returns Dirección normalizada
   */
  getMoveDirection(): { x: number; y: number };

  /**
   * Verifica si el jugador quiere correr
   * @returns true si shift está presionado
   */
  wantsToRun(): boolean;

  /**
   * Destruye el servicio y libera recursos
   */
  destroy(): void;
}
