/**
 * InteractionService - Interfaces
 *
 * Define el contrato del servicio de interacción.
 */

import type { InteractiveObject, IndicatorState } from './types';
import type { InteractionResult } from '@components/InteractionComponent';

/**
 * Interfaz del servicio de interacción
 *
 * Responsabilidades:
 * - Detectar objetos cercanos al jugador
 * - Mostrar indicador de interacción
 * - Gestionar tecla de acción
 * - Ejecutar acciones en objetos
 */
export interface IInteractionService {
  /**
   * Inicializa el servicio con la escena
   * @param scene - Escena de Phaser
   */
  initialize(scene: Phaser.Scene): void;

  /**
   * Registra un objeto interactivo
   * @param object - Objeto a registrar
   */
  registerObject(object: InteractiveObject): void;

  /**
   * Registra múltiples objetos
   * @param objects - Lista de objetos
   */
  registerObjects(objects: InteractiveObject[]): void;

  /**
   * Elimina un objeto del registro
   * @param id - ID del objeto
   */
  unregisterObject(id: string): void;

  /**
   * Actualiza la posición del jugador y detecta interacciones
   * @param playerPosition - Posición actual del jugador
   * @param delta - Tiempo desde la última actualización
   */
  update(playerPosition: { x: number; y: number }, delta: number): void;

  /**
   * Obtiene el objeto más cercano al jugador
   * @returns Objeto cercano o null
   */
  getNearestObject(): InteractiveObject | null;

  /**
   * Ejecuta la interacción con el objeto más cercano
   * @returns Resultado de la interacción
   */
  interact(): InteractionResult | null;

  /**
   * Obtiene el estado del indicador
   * @returns Estado del indicador
   */
  getIndicatorState(): IndicatorState;

  /**
   * Verifica si hay una interacción disponible
   * @returns true si hay objeto cercano
   */
  hasInteractionAvailable(): boolean;

  /**
   * Destruye el servicio y libera recursos
   */
  destroy(): void;
}
