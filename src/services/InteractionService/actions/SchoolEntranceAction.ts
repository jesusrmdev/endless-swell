/**
 * SchoolEntranceAction - Acción de entrada a escuela de surf
 *
 * Ejecuta la acción de entrar a la escuela de surf.
 */

import type { InteractionResult } from '@components/InteractionComponent';

export class SchoolEntranceAction {
  /**
   * Ejecuta la acción de la escuela de surf
   */
  execute(_data?: Record<string, unknown>): InteractionResult {
    console.log('[SchoolEntranceAction] Surf School.');

    return {
      success: true,
      message: 'Surf School.',
    };
  }
}
