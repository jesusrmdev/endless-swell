/**
 * DoorAction - Acción de puerta
 *
 * Ejecuta la acción de una puerta (por ahora solo log).
 */

import type { InteractionResult } from '@components/InteractionComponent';

export class DoorAction {
  private targetMap: string | null;

  constructor(targetMap: string | null = null) {
    this.targetMap = targetMap;
  }

  /**
   * Ejecuta la acción de la puerta
   */
  execute(_data?: Record<string, unknown>): InteractionResult {
    console.log('[DoorAction] Door activated.');

    return {
      success: true,
      message: 'Door activated.',
      data: { targetMap: this.targetMap },
    };
  }

  /**
   * Obtiene el mapa destino
   */
  getTargetMap(): string | null {
    return this.targetMap;
  }
}
