/**
 * InteractionComponent - Interfaces
 *
 * Define el contrato del componente de interacción reutilizable.
 */

import type { InteractionConfig, InteractionState, InteractionResult } from './types';

/**
 * Interfaz del componente de interacción
 *
 * Responsabilidades:
 * - Definir radio de interacción
 * - Definir tipo de acción
 * - Ejecutar acción cuando se solicita
 */
export interface IInteractionComponent {
  /**
   * Inicializa el componente con configuración
   * @param config - Configuración de interacción
   */
  initialize(config: InteractionConfig): void;

  /**
   * Obtiene el estado actual de la interacción
   * @returns Estado de la interacción
   */
  getState(): InteractionState;

  /**
   * Verifica si un punto está dentro del radio de interacción
   * @param point - Punto a verificar
   * @returns true si está en rango
   */
  isInRange(point: { x: number; y: number }): boolean;

  /**
   * Actualiza el estado de rango
   * @param inRange - Si el jugador está en rango
   */
  setInRange(inRange: boolean): void;

  /**
   * Ejecuta la acción de interacción
   * @returns Resultado de la interacción
   */
  execute(): InteractionResult;

  /**
   * Obtiene el ID del objeto interactivo
   * @returns Identificador único
   */
  getId(): string;

  /**
   * Obtiene el tipo de acción
   * @returns Tipo de acción
   */
  getActionType(): string;

  /**
   * Obtiene la posición del objeto
   * @returns Posición {x, y}
   */
  getPosition(): { x: number; y: number };

  /**
   * Establece la posición del objeto
   * @param position - Nueva posición
   */
  setPosition(position: { x: number; y: number }): void;

  /**
   * Habilita o deshabilita la interacción
   * @param enabled - true para habilitar
   */
  setEnabled(enabled: boolean): void;

  /**
   * Destruye el componente y libera recursos
   */
  destroy(): void;
}
