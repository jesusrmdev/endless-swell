/**
 * VirtualResolution - Gestor de resolución virtual
 *
 * Implementa pixel perfect rendering estilo Pokémon GBC.
 * Toda la escena se renderiza a una resolución virtual fija,
 * luego se escala al tamaño de pantalla sin distorsión.
 */

export interface VirtualResolutionConfig {
  /** Ancho de la resolución virtual en píxeles */
  width: number;
  /** Alto de la resolución virtual en píxeles */
  height: number;
  /** Color de fondo de la resolución virtual */
  backgroundColor: string;
}

export class VirtualResolution {
  private config: VirtualResolutionConfig;
  private scene: Phaser.Scene | null = null;
  private renderTexture: Phaser.GameObjects.RenderTexture | null = null;
  private scaleImage: Phaser.GameObjects.Image | null = null;

  constructor(config: VirtualResolutionConfig) {
    this.config = config;
  }

  /**
   * Inicializa la resolución virtual en la escena
   */
  initialize(scene: Phaser.Scene): void {
    this.scene = scene;

    const { width, height } = this.config;

    // Crear RenderTexture a resolución virtual
    this.renderTexture = scene.add.renderTexture(0, 0, width, height);
    this.renderTexture.setOrigin(0, 0);
    this.renderTexture.setDepth(1000); // Siempre encima de todo
    this.renderTexture.setScrollFactor(0);

    // Crear imagen de escala que se renderizará en pantalla
    this.scaleImage = scene.add.image(0, 0, this.renderTexture.texture.key);
    this.scaleImage.setOrigin(0, 0);
    this.scaleImage.setScrollFactor(0);
    this.scaleImage.setDepth(1000);

    // Calcular escala para llenar la pantalla
    this.updateScale();

    console.log(`[VirtualResolution] Initialized: ${width}x${height}`);
  }

  /**
   * Actualiza la escala según el tamaño de pantalla
   */
  private updateScale(): void {
    if (!this.scene || !this.scaleImage) return;

    const screenWidth = this.scene.cameras.main.width;
    const screenHeight = this.scene.cameras.main.height;

    const scaleX = screenWidth / this.config.width;
    const scaleY = screenHeight / this.config.height;

    // Usar la escala menor para mantener aspecto ratio
    const scale = Math.min(scaleX, scaleY);

    this.scaleImage.setScale(scale);

    // Centrar en pantalla
    const scaledWidth = this.config.width * scale;
    const scaledHeight = this.config.height * scale;
    this.scaleImage.setPosition(
      (screenWidth - scaledWidth) / 2,
      (screenHeight - scaledHeight) / 2,
    );

    console.log(`[VirtualResolution] Scale: ${scale.toFixed(2)}x (${scaledWidth}x${scaledHeight})`);
  }

  /**
   * Obtiene el RenderTexture para renderizar en él
   */
  getRenderTexture(): Phaser.GameObjects.RenderTexture | null {
    return this.renderTexture;
  }

  /**
   * Obtiene las dimensiones virtuales
   */
  getConfig(): VirtualResolutionConfig {
    return { ...this.config };
  }

  /**
   * Obtiene el ancho virtual
   */
  getWidth(): number {
    return this.config.width;
  }

  /**
   * Obtiene el alto virtual
   */
  getHeight(): number {
    return this.config.height;
  }

  /**
   * Actualiza cuando cambia el tamaño de pantalla
   */
  onResize(_width: number, _height: number): void {
    if (this.renderTexture) {
      this.renderTexture.setSize(this.config.width, this.config.height);
    }
    this.updateScale();
  }

  /**
   * Limpia y destruye recursos
   */
  destroy(): void {
    if (this.renderTexture) {
      this.renderTexture.destroy();
      this.renderTexture = null;
    }
    if (this.scaleImage) {
      this.scaleImage.destroy();
      this.scaleImage = null;
    }
    this.scene = null;
    console.log('[VirtualResolution] Destroyed');
  }
}
