/**
 * InteractionService - Implementación con Phaser
 *
 * Gestiona interacciones entre el jugador y objetos del mundo.
 * Detecta objetos cercanos, muestra indicador, ejecuta acciones.
 * Único componente del sistema de interacción que depende de Phaser.
 */

import type { IInteractionService } from './interfaces';
import type { InteractiveObject, IndicatorState } from './types';
import type { InteractionResult } from '@components/InteractionComponent';
import { SignAction } from './actions/SignAction';
import { DoorAction } from './actions/DoorAction';
import { SchoolEntranceAction } from './actions/SchoolEntranceAction';

export class InteractionService implements IInteractionService {
  private scene: Phaser.Scene | null = null;
  private objects: Map<string, InteractiveObject> = new Map();
  private nearestObject: InteractiveObject | null = null;
  private indicatorText: Phaser.GameObjects.Text | null = null;
  private indicatorVisible = false;

  /**
   * Inicializa el servicio con la escena
   */
  initialize(scene: Phaser.Scene): void {
    this.scene = scene;

    // Crear indicador de interacción
    this.indicatorText = scene.add.text(0, 0, '[E]', {
      fontFamily: 'Arial',
      fontSize: '10px',
      color: '#ffffff',
      backgroundColor: '#000000',
      padding: { x: 2, y: 2 },
    });
    this.indicatorText.setOrigin(0.5, 1);
    this.indicatorText.setDepth(200);
    this.indicatorText.setVisible(false);

    console.log('[InteractionService] Initialized');
  }

  /**
   * Registra un objeto interactivo
   */
  registerObject(object: InteractiveObject): void {
    this.objects.set(object.id, object);
    console.log(`[InteractionService] Object registered: ${object.id} (${object.actionType})`);
  }

  /**
   * Registra múltiples objetos
   */
  registerObjects(objects: InteractiveObject[]): void {
    for (const object of objects) {
      this.registerObject(object);
    }
  }

  /**
   * Elimina un objeto del registro
   */
  unregisterObject(id: string): void {
    this.objects.delete(id);
    console.log(`[InteractionService] Object unregistered: ${id}`);
  }

  /**
   * Actualiza la posición del jugador y detecta interacciones
   */
  update(playerPosition: { x: number; y: number }, _delta: number): void {
    // Encontrar el objeto más cercano dentro del radio
    let closest: InteractiveObject | null = null;
    let closestDistance = Infinity;

    for (const object of this.objects.values()) {
      const dx = playerPosition.x - object.position.x;
      const dy = playerPosition.y - object.position.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance <= object.radius && distance < closestDistance) {
        closest = object;
        closestDistance = distance;
      }
    }

    this.nearestObject = closest;

    // Actualizar indicador
    if (closest && this.indicatorText) {
      this.indicatorText.setPosition(closest.position.x, closest.position.y - 20);
      this.indicatorText.setVisible(true);
      this.indicatorVisible = true;
    } else if (this.indicatorText) {
      this.indicatorText.setVisible(false);
      this.indicatorVisible = false;
    }
  }

  /**
   * Obtiene el objeto más cercano al jugador
   */
  getNearestObject(): InteractiveObject | null {
    return this.nearestObject;
  }

  /**
   * Ejecuta la interacción con el objeto más cercano
   */
  interact(): InteractionResult | null {
    if (!this.nearestObject) {
      return null;
    }

    const object = this.nearestObject;
    let result: InteractionResult;

    switch (object.actionType) {
      case 'sign': {
        const action = new SignAction(object.actionData?.message as string);
        result = action.execute(object.actionData);
        break;
      }
      case 'door': {
        const action = new DoorAction(object.actionData?.targetMap as string);
        result = action.execute(object.actionData);
        break;
      }
      case 'school_entrance': {
        const action = new SchoolEntranceAction();
        result = action.execute(object.actionData);
        break;
      }
      default:
        result = { success: false, message: `Unknown action type: ${object.actionType}` };
    }

    return result;
  }

  /**
   * Obtiene el estado del indicador
   */
  getIndicatorState(): IndicatorState {
    return {
      visible: this.indicatorVisible,
      position: this.indicatorText
        ? { x: this.indicatorText.x, y: this.indicatorText.y }
        : { x: 0, y: 0 },
      targetId: this.nearestObject?.id ?? null,
    };
  }

  /**
   * Verifica si hay una interacción disponible
   */
  hasInteractionAvailable(): boolean {
    return this.nearestObject !== null;
  }

  /**
   * Destruye el servicio y libera recursos
   */
  destroy(): void {
    if (this.indicatorText) {
      this.indicatorText.destroy();
    }

    const sceneKey = this.scene?.scene.key ?? 'unknown';
    this.objects.clear();
    this.nearestObject = null;
    this.indicatorText = null;
    this.indicatorVisible = false;
    this.scene = null;

    console.log(`[InteractionService] Destroyed (scene: ${sceneKey})`);
  }
}
