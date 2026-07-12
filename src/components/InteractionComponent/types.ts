/**
 * InteractionComponent - Tipos
 *
 * Define los tipos para el sistema de interacción.
 */

/**
 * Tipo de acción de interacción
 */
export type InteractionActionType = 'sign' | 'door' | 'school_entrance' | 'custom';

/**
 * Configuración de un InteractionComponent
 */
export interface InteractionConfig {
  /** Identificador único del objeto interactivo */
  id: string;
  /** Tipo de acción a ejecutar */
  actionType: InteractionActionType;
  /** Radio de interacción en píxeles */
  radius: number;
  /** Datos adicionales para la acción */
  actionData?: Record<string, unknown>;
}

/**
 * Estado de un InteractionComponent
 */
export interface InteractionState {
  /** Si el jugador está dentro del radio de interacción */
  isInRange: boolean;
  /** Si la interacción está habilitada */
  isEnabled: boolean;
  /** Posición del objeto interactivo */
  position: { x: number; y: number };
}

/**
 * Resultado de una interacción
 */
export interface InteractionResult {
  /** Si la interacción se ejecutó correctamente */
  success: boolean;
  /** Mensaje a mostrar (para carteles, etc.) */
  message?: string;
  /** Datos adicionales del resultado */
  data?: Record<string, unknown>;
}
