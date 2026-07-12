/**
 * CameraService - Implementación con Phaser
 *
 * Gestión completa de la cámara principal.
 * Único componente del sistema de cámara que depende de Phaser.
 * Proporciona API limpia para seguimiento, zoom, efectos y transiciones.
 */

import type { ICameraService, CameraPreset, CameraBounds, CameraFollowTarget } from './interfaces';
import { OVERWORLD_PRESET } from './CameraPresets';

export class CameraService implements ICameraService {
  private scene: Phaser.Scene | null = null;
  private camera: Phaser.Cameras.Scene2D.Camera | null = null;
  private currentPreset: CameraPreset = OVERWORLD_PRESET;
  private followTarget: CameraFollowTarget | null = null;
  private bounds: CameraBounds | null = null;

  /**
   * Inicializa el servicio con la escena
   */
  initialize(scene: Phaser.Scene): void {
    this.scene = scene;
    this.camera = scene.cameras.main;

    // Aplicar preset por defecto
    this.applyPreset(this.currentPreset);

    console.log('[CameraService] Initialized');
  }

  /**
   * Aplica un preset de cámara
   */
  setPreset(preset: CameraPreset): void {
    this.currentPreset = preset;
    this.applyPreset(preset);

    console.log(`[CameraService] Preset applied: ${preset.name}`);
  }

  /**
   * Obtiene el preset actual
   */
  getCurrentPreset(): CameraPreset {
    return { ...this.currentPreset };
  }

  /**
   * Aplica la configuración del preset a la cámara
   */
  private applyPreset(preset: CameraPreset): void {
    if (!this.camera) return;

    // Aplicar zoom
    this.camera.setZoom(preset.zoom);

    // Aplicar deadzone
    if (preset.deadzone.width > 0 && preset.deadzone.height > 0) {
      this.camera.setDeadzone(
        preset.deadzone.width,
        preset.deadzone.height,
      );
    }

    // Configurar seguimiento si hay target
    if (this.followTarget && preset.shouldFollow) {
      this.configureFollow();
    } else if (!preset.shouldFollow) {
      this.camera.stopFollow();
    }
  }

  /**
   * Configura el sprite a seguir
   */
  follow(target: Phaser.GameObjects.Sprite): void {
    if (!this.camera) return;

    this.followTarget = {
      sprite: target,
      followX: true,
      followY: true,
    };

    this.configureFollow();

    console.log('[CameraService] Following target');
  }

  /**
   * Configura el seguimiento según el target y preset
   */
  private configureFollow(): void {
    if (!this.camera || !this.followTarget) return;

    const { sprite, followX, followY } = this.followTarget;

    this.camera.startFollow(sprite, true, this.currentPreset.followLerp, this.currentPreset.followLerp);

    // Configurar qué ejes seguir
    this.camera.followOffset.set(0, 0);

    // Si solo seguimos un eje, ajustar el lerp del otro
    if (!followX) {
      this.camera.startFollow(sprite, false, 0, this.currentPreset.followLerp);
    } else if (!followY) {
      this.camera.startFollow(sprite, false, this.currentPreset.followLerp, 0);
    }
  }

  /**
   * Detiene el seguimiento
   */
  stopFollow(): void {
    if (!this.camera) return;

    this.camera.stopFollow();
    this.followTarget = null;

    console.log('[CameraService] Follow stopped');
  }

  /**
   * Establece los límites del mundo
   */
  setBounds(bounds: CameraBounds): void {
    if (!this.camera) return;

    this.bounds = bounds;
    this.camera.setBounds(bounds.x, bounds.y, bounds.width, bounds.height);

    console.log(`[CameraService] Bounds set: ${bounds.width}x${bounds.height}`);
  }

  /**
   * Obtiene los límites actuales
   */
  getBounds(): CameraBounds | null {
    return this.bounds ? { ...this.bounds } : null;
  }

  /**
   * Establece el zoom manualmente
   */
  setZoom(zoom: number): void {
    if (!this.camera) return;

    this.camera.setZoom(zoom);

    console.log(`[CameraService] Zoom set: ${zoom}`);
  }

  /**
   * Obtiene el zoom actual
   */
  getZoom(): number {
    return this.camera?.zoom ?? 1;
  }

  /**
   * Obtiene la posición actual de la cámara
   */
  getPosition(): { x: number; y: number } {
    if (!this.camera) return { x: 0, y: 0 };

    return {
      x: this.camera.scrollX,
      y: this.camera.scrollY,
    };
  }

  /**
   * Efecto de temblor de cámara
   */
  shake(duration?: number, intensity?: number): void {
    if (!this.camera) return;

    this.camera.shake(duration ?? 100, intensity ?? 0.01);

    console.log('[CameraService] Shake effect');
  }

  /**
   * Efecto de flash de cámara
   */
  flash(duration?: number, color?: number): void {
    if (!this.camera) return;

    this.camera.flash(duration ?? 300, color ?? 0xffffff);

    console.log('[CameraService] Flash effect');
  }

  /**
   * Limpia recursos
   */
  destroy(): void {
    if (this.camera) {
      this.camera.stopFollow();
      this.camera.resetFX();
    }

    const sceneKey = this.scene?.scene.key ?? 'unknown';
    this.scene = null;
    this.camera = null;
    this.followTarget = null;
    this.bounds = null;
    this.currentPreset = OVERWORLD_PRESET;

    console.log(`[CameraService] Destroyed (scene: ${sceneKey})`);
  }
}
