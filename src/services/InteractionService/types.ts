/**
 * InteractionService - Tipos
 *
 * Define los tipos para el servicio de interacción.
 */

import type { InteractionActionType } from '@components/InteractionComponent';

/**
 * Objeto interactivo registrado en el servicio
 */
export interface InteractiveObject {
  /** ID único del objeto */
  id: string;
  /** Tipo de acción */
  actionType: InteractionActionType;
  /** Posición en píxeles */
  position: { x: number; y: number };
  /** Radio de interacción */
  radius: number;
  /** Datos de la acción */
  actionData?: Record<string, unknown>;
}

/**
 * Estado del indicador de interacción
 */
export interface IndicatorState {
  /** Si el indicador está visible */
  visible: boolean;
  /** Posición del indicador */
  position: { x: number; y: number };
  /** Objeto actualmente seleccionado */
  targetId: string | null;
}

/**
 * Configuración del InteractionService
 */
export interface InteractionServiceConfig {
  /** Radio de detección por defecto */
  defaultRadius: number;
  /** Tecla de interacción */
  actionKey: string;
}
