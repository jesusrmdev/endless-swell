/**
 * InteractionComponent - Componente de interacción reutilizable
 *
 * Maneja la lógica de interacción para cualquier objeto del juego.
 * Independiente de Phaser - solo trabaja con datos numéricos.
 *
 * @example
 * ```typescript
 * const interaction = new InteractionComponent();
 * interaction.initialize({ id: 'sign-1', actionType: 'sign', radius: 32 });
 * interaction.setPosition({ x: 100, y: 200 });
 *
 * if (interaction.isInRange(playerPosition)) {
 *   interaction.execute();
 * }
 * ```
 */

import type { IInteractionComponent } from './interfaces';
import type { InteractionConfig, InteractionState, InteractionResult } from './types';

export class InteractionComponent implements IInteractionComponent {
  private config: InteractionConfig = {
    id: '',
    actionType: 'custom',
    radius: 32,
  };

  private state: InteractionState = {
    isInRange: false,
    isEnabled: true,
    position: { x: 0, y: 0 },
  };

  /**
   * Inicializa el componente con configuración
   */
  initialize(config: InteractionConfig): void {
    this.config = { ...config };
    console.log(`[InteractionComponent] Initialized: ${config.id} (${config.actionType})`);
  }

  /**
   * Obtiene el estado actual de la interacción
   */
  getState(): InteractionState {
    return {
      isInRange: this.state.isInRange,
      isEnabled: this.state.isEnabled,
      position: { ...this.state.position },
    };
  }

  /**
   * Verifica si un punto está dentro del radio de interacción
   */
  isInRange(point: { x: number; y: number }): boolean {
    if (!this.state.isEnabled) return false;

    const dx = point.x - this.state.position.x;
    const dy = point.y - this.state.position.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    return distance <= this.config.radius;
  }

  /**
   * Actualiza el estado de rango
   */
  setInRange(inRange: boolean): void {
    this.state.isInRange = inRange;
  }

  /**
   * Ejecuta la acción de interacción
   * La implementación concreta debe ser proporcionada externamente
   */
  execute(): InteractionResult {
    if (!this.state.isEnabled) {
      return { success: false, message: 'Interaction disabled' };
    }

    // La ejecución real se maneja en InteractionService
    // Este componente solo define la configuración
    return {
      success: true,
      message: `Interaction: ${this.config.actionType}`,
      data: { id: this.config.id, actionType: this.config.actionType },
    };
  }

  /**
   * Obtiene el ID del objeto interactivo
   */
  getId(): string {
    return this.config.id;
  }

  /**
   * Obtiene el tipo de acción
   */
  getActionType(): string {
    return this.config.actionType;
  }

  /**
   * Obtiene la posición del objeto
   */
  getPosition(): { x: number; y: number } {
    return { ...this.state.position };
  }

  /**
   * Establece la posición del objeto
   */
  setPosition(position: { x: number; y: number }): void {
    this.state.position = { ...position };
  }

  /**
   * Habilita o deshabilita la interacción
   */
  setEnabled(enabled: boolean): void {
    this.state.isEnabled = enabled;
  }

  /**
   * Destruye el componente y libera recursos
   */
  destroy(): void {
    this.state = {
      isInRange: false,
      isEnabled: false,
      position: { x: 0, y: 0 },
    };
    console.log(`[InteractionComponent] Destroyed: ${this.config.id}`);
  }
}
