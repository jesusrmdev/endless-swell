/**
 * InteractionService - Sistema de interacción del juego
 *
 * Gestiona detección de objetos cercanos, indicadores y ejecución de acciones.
 */

export { InteractionService } from './InteractionService';
export type { IInteractionService } from './interfaces';
export type { InteractiveObject, IndicatorState, InteractionServiceConfig } from './types';
export { SignAction } from './actions/SignAction';
export { DoorAction } from './actions/DoorAction';
export { SchoolEntranceAction } from './actions/SchoolEntranceAction';
