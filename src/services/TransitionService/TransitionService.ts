/**
 * TransitionService - Implementación con Phaser
 *
 * Gestiona transiciones entre mapas y escenas.
 * Proporciona efectos de fundido y barrido estilo Pokémon.
 */

import type { ITransitionService, TransitionResult, TransitionDirection } from './interfaces';
import { FadeEffect } from './effects/FadeEffect';
import { WipeEffect } from './effects/WipeEffect';

export class TransitionService implements ITransitionService {
  private scene: Phaser.Scene | null = null;
  private fadeEffect: FadeEffect | null = null;
  private wipeEffect: WipeEffect | null = null;
  private transitioning = false;

  /**
   * Inicializa el servicio
   */
  initialize(scene: Phaser.Scene): void {
    this.scene = scene;
    this.fadeEffect = new FadeEffect(scene);
    this.wipeEffect = new WipeEffect(scene);

    console.log('[TransitionService] Initialized');
  }

  /**
   * Fundido a negro (fade out)
   */
  async fadeToBlack(duration: number = 300, color: number = 0x000000): Promise<TransitionResult> {
    if (this.transitioning) {
      return { success: false, error: 'Transition already in progress' };
    }

    if (!this.fadeEffect) {
      return { success: false, error: 'TransitionService not initialized' };
    }

    this.transitioning = true;

    try {
      await this.fadeEffect.fadeOut(duration, color);
      this.transitioning = false;

      console.log('[TransitionService] Fade to black complete');
      return { success: true };
    } catch (error) {
      this.transitioning = false;
      return { success: false, error: String(error) };
    }
  }

  /**
   * Fundido desde negro (fade in)
   */
  async fadeFromBlack(duration: number = 300, color: number = 0x000000): Promise<TransitionResult> {
    if (this.transitioning) {
      return { success: false, error: 'Transition already in progress' };
    }

    if (!this.fadeEffect) {
      return { success: false, error: 'TransitionService not initialized' };
    }

    this.transitioning = true;

    try {
      await this.fadeEffect.fadeIn(duration, color);
      this.transitioning = false;

      console.log('[TransitionService] Fade from black complete');
      return { success: true };
    } catch (error) {
      this.transitioning = false;
      return { success: false, error: String(error) };
    }
  }

  /**
   * Transición wipe horizontal
   */
  async wipeTransition(direction: TransitionDirection = 'left', duration: number = 500): Promise<TransitionResult> {
    if (this.transitioning) {
      return { success: false, error: 'Transition already in progress' };
    }

    if (!this.wipeEffect) {
      return { success: false, error: 'TransitionService not initialized' };
    }

    this.transitioning = true;

    try {
      await this.wipeEffect.wipe(direction, duration);
      this.transitioning = false;

      console.log(`[TransitionService] Wipe ${direction} complete`);
      return { success: true };
    } catch (error) {
      this.transitioning = false;
      return { success: false, error: String(error) };
    }
  }

  /**
   * Transición completa de mapa
   * Realiza fade out, cambio de mapa, fade in
   */
  async transitionToMap(_mapKey: string, _spawnPoint: string): Promise<TransitionResult> {
    if (this.transitioning) {
      return { success: false, error: 'Transition already in progress' };
    }

    this.transitioning = true;

    try {
      // 1. Fade out
      await this.fadeToBlack(300);

      // 2. Aquí se cambiaría el mapa (implementación futura)
      // this.scene?.scene.restart();
      console.log(`[TransitionService] Map transition to: ${_mapKey}`);

      // 3. Fade in
      await this.fadeFromBlack(300);

      this.transitioning = false;

      console.log('[TransitionService] Map transition complete');
      return { success: true };
    } catch (error) {
      this.transitioning = false;
      return { success: false, error: String(error) };
    }
  }

  /**
   * Verifica si hay una transición en curso
   */
  isTransitioning(): boolean {
    return this.transitioning;
  }

  /**
   * Limpia recursos
   */
  destroy(): void {
    if (this.fadeEffect) {
      this.fadeEffect.destroy();
    }
    if (this.wipeEffect) {
      this.wipeEffect.destroy();
    }

    const sceneKey = this.scene?.scene.key ?? 'unknown';
    this.scene = null;
    this.fadeEffect = null;
    this.wipeEffect = null;
    this.transitioning = false;

    console.log(`[TransitionService] Destroyed (scene: ${sceneKey})`);
  }
}
