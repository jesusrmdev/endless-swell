/**
 * SignAction - Acción de cartel
 *
 * Muestra un mensaje cuando el jugador interactúa con un cartel.
 */

import type { InteractionResult } from '@components/InteractionComponent';

export class SignAction {
  private message: string;

  constructor(message: string = 'Bienvenido a Playa de Calblanque') {
    this.message = message;
  }

  /**
   * Ejecuta la acción del cartel
   */
  execute(_data?: Record<string, unknown>): InteractionResult {
    console.log(`[SignAction] ${this.message}`);

    return {
      success: true,
      message: this.message,
    };
  }

  /**
   * Obtiene el mensaje del cartel
   */
  getMessage(): string {
    return this.message;
  }
}
