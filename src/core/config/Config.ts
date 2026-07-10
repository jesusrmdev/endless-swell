/**
 * Config - Configuración centralizada del juego
 *
 * Contiene todas las configuraciones del juego en un solo lugar.
 * Los valores pueden ser cargados desde archivos de configuración
 * o desde variables de entorno.
 */

export interface GameConfig {
  /** Ancho del canvas en píxeles */
  width: number;
  /** Alto del canvas en píxeles */
  height: number;
  /** Color de fondo del juego */
  backgroundColor: string;
  /** Si está en modo debug */
  debug: boolean;
  /** Versión del juego */
  version: string;
}

export interface PhysicsConfig {
  /** Gravedad en el eje Y */
  gravity: number;
  /** Si la física está habilitada */
  enabled: boolean;
}

export interface AudioConfig {
  /** Volumen de la música (0-1) */
  musicVolume: number;
  /** Volumen de los efectos de sonido (0-1) */
  sfxVolume: number;
  /** Si el audio está habilitado */
  enabled: boolean;
}

export interface SaveConfig {
  /** Nombre del archivo de guardado */
  fileName: string;
  /** Si el guardado automático está habilitado */
  autoSave: boolean;
  /** Intervalo de guardado automático en milisegundos */
  autoSaveInterval: number;
}

export interface MovementConfig {
  /** Velocidad de caminar en píxeles por segundo */
  walkSpeed: number;
  /** Velocidad de correr en píxeles por segundo */
  runSpeed: number;
  /** Aceleración en píxeles por segundo² */
  acceleration: number;
  /** Desaceleración en píxeles por segundo² */
  deceleration: number;
}

export interface AppConfig {
  game: GameConfig;
  physics: PhysicsConfig;
  audio: AudioConfig;
  save: SaveConfig;
  movement: MovementConfig;
}

/**
 * Configuración por defecto del juego
 */
const DEFAULT_CONFIG: AppConfig = {
  game: {
    width: 1280,
    height: 720,
    backgroundColor: '#1a1a2e',
    debug: false,
    version: '0.1.0',
  },
  physics: {
    gravity: 800,
    enabled: true,
  },
  audio: {
    musicVolume: 0.7,
    sfxVolume: 0.8,
    enabled: true,
  },
  save: {
    fileName: 'endless-swell-save',
    autoSave: true,
    autoSaveInterval: 300000, // 5 minutos
  },
  movement: {
    walkSpeed: 150,
    runSpeed: 225,
    acceleration: 600,
    deceleration: 400,
  },
};

/**
 * Clase de configuración del juego
 *
 * Proporciona acceso centralizado a todas las configuraciones.
 * Implementa el patrón Singleton para garantizar una única instancia.
 */
export class Config {
  private static instance: Config;
  private config: AppConfig;

  private constructor() {
    this.config = this.loadConfig();
  }

  /**
   * Obtiene la instancia singleton de Config
   */
  static getInstance(): Config {
    if (!Config.instance) {
      Config.instance = new Config();
    }
    return Config.instance;
  }

  /**
   * Carga la configuración desde variables de entorno o usa valores por defecto
   */
  private loadConfig(): AppConfig {
    const config = { ...DEFAULT_CONFIG };

    // Cargar desde variables de entorno si existen
    if (typeof import.meta !== 'undefined' && import.meta.env) {
      const env = import.meta.env;
      if (env.VITE_GAME_WIDTH) {
        config.game.width = parseInt(env.VITE_GAME_WIDTH, 10);
      }
      if (env.VITE_GAME_HEIGHT) {
        config.game.height = parseInt(env.VITE_GAME_HEIGHT, 10);
      }
      if (env.VITE_DEBUG_MODE) {
        config.game.debug = env.VITE_DEBUG_MODE === 'true';
      }
    }

    return config;
  }

  /**
   * Obtiene la configuración completa
   */
  getConfig(): AppConfig {
    return { ...this.config };
  }

  /**
   * Obtiene la configuración del juego
   */
  getGameConfig(): GameConfig {
    return { ...this.config.game };
  }

  /**
   * Obtiene la configuración de física
   */
  getPhysicsConfig(): PhysicsConfig {
    return { ...this.config.physics };
  }

  /**
   * Obtiene la configuración de audio
   */
  getAudioConfig(): AudioConfig {
    return { ...this.config.audio };
  }

  /**
   * Obtiene la configuración de guardado
   */
  getSaveConfig(): SaveConfig {
    return { ...this.config.save };
  }

  /**
   * Obtiene la configuración de movimiento
   */
  getMovementConfig(): MovementConfig {
    return { ...this.config.movement };
  }

  /**
   * Actualiza parcialmente la configuración
   * @param partial - Parte de la configuración a actualizar
   */
  updateConfig(partial: Partial<AppConfig>): void {
    this.config = {
      ...this.config,
      ...partial,
      game: { ...this.config.game, ...partial.game },
      physics: { ...this.config.physics, ...partial.physics },
      audio: { ...this.config.audio, ...partial.audio },
      save: { ...this.config.save, ...partial.save },
      movement: { ...this.config.movement, ...partial.movement },
    };
  }
}

// Instancia global de Config
export const config = Config.getInstance();
