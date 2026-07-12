/**
 * WipeEffect - Efecto de barrido
 *
 * Implementa transiciones de barrido horizontal/vertical.
 * Estilo Pokémon Game Boy Color.
 */

import type { TransitionDirection } from '../interfaces';

export class WipeEffect {
  private scene: Phaser.Scene | null = null;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  /**
   * Efecto de barrido
   */
  async wipe(direction: TransitionDirection, duration: number = 500): Promise<void> {
    if (!this.scene) return;

    const camera = this.scene.cameras.main;
    const width = camera.width;
    const height = camera.height;

    // Crear gráfico para el barrido
    const graphics = this.scene.add.graphics();
    graphics.setDepth(1000);
    graphics.setScrollFactor(0);

    return new Promise((resolve) => {
      const startTime = this.scene?.time.now ?? 0;

      const updateWipe = () => {
        if (!this.scene) {
          graphics.destroy();
          resolve();
          return;
        }

        const elapsed = (this.scene.time.now ?? 0) - startTime;
        const progress = Math.min(elapsed / duration, 1);

        graphics.clear();

        // Color de barrido
        graphics.fillStyle(0x000000, 1);

        switch (direction) {
          case 'left':
            graphics.fillRect(0, 0, width * progress, height);
            break;
          case 'right':
            graphics.fillRect(width * (1 - progress), 0, width * progress, height);
            break;
          case 'up':
            graphics.fillRect(0, 0, width, height * progress);
            break;
          case 'down':
            graphics.fillRect(0, height * (1 - progress), width, height * progress);
            break;
        }

        if (progress < 1) {
          this.scene?.time.delayedCall(16, updateWipe);
        } else {
          graphics.destroy();
          resolve();
        }
      };

      updateWipe();
    });
  }

  /**
   * Limpia recursos
   */
  destroy(): void {
    this.scene = null;
  }
}
