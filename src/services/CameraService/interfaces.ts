/**
 * CameraService - Interfaces
 *
 * Define los tipos para el sistema de cámara.
 */

/**
 * Configuración de un preset de cámara
 */
export interface CameraPreset {
  /** Nombre del preset */
  name: string;
  /** Nivel de zoom */
  zoom: number;
  /** Dimensiones de la deadzone en píxeles */
  deadzone: {
    width: number;
    height: number;
  };
  /** Velocidad de interpolación del seguimiento (0-1) */
  followLerp: number;
  /** Si la cámara debe seguir al jugador */
  shouldFollow: boolean;
}

/**
 * Punto de seguimiento de cámara
 */
export interface CameraFollowTarget {
  /** Sprite a seguir */
  sprite: Phaser.GameObjects.Sprite;
  /** Si debe seguir horizontalmente */
  followX?: boolean;
  /** Si debe seguir verticalmente */
  followY?: boolean;
}

/**
 * Configuración de.bounds de cámara
 */
export interface CameraBounds {
  /** Posición X inicial */
  x: number;
  /** Posición Y inicial */
  y: number;
  /** Ancho total */
  width: number;
  /** Alto total */
  height: number;
}

/**
 * Resultado de una transición de cámara
 */
export interface TransitionResult {
  /** Si la transición se completó */
  success: boolean;
  /** Mensaje de error si falló */
  error?: string;
}

/**
 * Interfaz principal del CameraService
 */
export interface ICameraService {
  /** Inicializa el servicio con la escena */
  initialize(scene: Phaser.Scene): void;

  /** Aplica un preset de cámara */
  setPreset(preset: CameraPreset): void;

  /** Obtiene el preset actual */
  getCurrentPreset(): CameraPreset;

  /** Configura el sprite a seguir */
  follow(target: Phaser.GameObjects.Sprite): void;

  /** Detiene el seguimiento */
  stopFollow(): void;

  /** Establece los límites del mundo */
  setBounds(bounds: CameraBounds): void;

  /** Obtiene los límites actuales */
  getBounds(): CameraBounds | null;

  /** Establece el zoom manualmente */
  setZoom(zoom: number): void;

  /** Obtiene el zoom actual */
  getZoom(): number;

  /** Obtiene la posición actual de la cámara */
  getPosition(): { x: number; y: number };

  /** Efecto de temblor de cámara */
  shake(duration?: number, intensity?: number): void;

  /** Efecto de flash de cámara */
  flash(duration?: number, color?: number): void;

  /** Limpia recursos */
  destroy(): void;
}
