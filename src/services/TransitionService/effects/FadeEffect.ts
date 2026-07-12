/**
 * FadeEffect - Efecto de fundido
 *
 * Implementa fade in y fade out usando la cámara de Phaser.
 */

export class FadeEffect {
  private scene: Phaser.Scene | null = null;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  /**
   * Fundido a negro (fade out)
   */
  async fadeOut(duration: number = 300, color: number = 0x000000): Promise<void> {
    if (!this.scene) return;

    const camera = this.scene.cameras.main;

    return new Promise((resolve) => {
      camera.fadeOut(duration, (color >> 16) & 0xff, (color >> 8) & 0xff, color & 0xff);

      this.scene?.time.delayedCall(duration, () => {
        resolve();
      });
    });
  }

  /**
   * Fundido desde negro (fade in)
   */
  async fadeIn(duration: number = 300, color: number = 0x000000): Promise<void> {
    if (!this.scene) return;

    const camera = this.scene.cameras.main;

    return new Promise((resolve) => {
      camera.fadeIn(duration, (color >> 16) & 0xff, (color >> 8) & 0xff, color & 0xff);

      this.scene?.time.delayedCall(duration, () => {
        resolve();
      });
    });
  }

  /**
   * Limpia recursos
   */
  destroy(): void {
    this.scene = null;
  }
}
