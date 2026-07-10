/**
 * Constants - Constantes globales del juego
 *
 * Contiene todas las constantes utilizadas en el juego.
 * Centralizar las constantes facilita el mantenimiento y la configuración.
 */

/**
 * Dimensiones del juego
 */
export const GAME_DIMENSIONS = {
  /** Ancho del canvas */
  WIDTH: 1280,
  /** Alto del canvas */
  HEIGHT: 720,
  /** Relación de aspecto */
  ASPECT_RATIO: 16 / 9,
} as const;

/**
 * Configuración de renderizado
 */
export const RENDER_CONFIG = {
  /** Resolución base del pixel art */
  PIXEL_ART_WIDTH: 320,
  /** Resolución base del pixel art */
  PIXEL_ART_HEIGHT: 180,
  /** Escala de renderizado */
  SCALE: 4,
  /** FPS objetivo */
  TARGET_FPS: 60,
} as const;

/**
 * Física del juego
 */
export const PHYSICS_CONFIG = {
  /** Gravedad por defecto */
  DEFAULT_GRAVITY: 800,
  /** Velocidad máxima del jugador */
  MAX_PLAYER_SPEED: 200,
  /** Fricción del suelo */
  GROUND_FRICTION: 0.8,
} as const;

/**
 * Configuración de audio
 */
export const AUDIO_CONFIG = {
  /** Volumen máximo */
  MAX_VOLUME: 1,
  /** Volumen mínimo */
  MIN_VOLUME: 0,
  /** Pasos de volumen para ajuste */
  VOLUME_STEP: 0.1,
} as const;

/**
 * Configuración de cámara
 */
export const CAMERA_CONFIG = {
  /** Velocidad de seguimiento de cámara */
  FOLLOW_SPEED: 0.1,
  /** Margen de deadzone */
  DEADZONE_WIDTH: 100,
  /** Margen de deadzone */
  DEADZONE_HEIGHT: 50,
} as const;

/**
 * Configuración de guardado
 */
export const SAVE_CONFIG = {
  /** Versión del formato de guardado */
  FORMAT_VERSION: 1,
  /** Extensión del archivo de guardado */
  FILE_EXTENSION: '.json',
} as const;

/**
 * Namespaces de eventos
 *
 * Centraliza los nombres de eventos para evitar errores tipográficos
 */
export const EVENTS = {
  // Eventos del juego
  GAME: {
    READY: 'game:ready',
    PAUSE: 'game:pause',
    RESUME: 'game:resume',
    QUIT: 'game:quit',
  },

  // Eventos del jugador
  PLAYER: {
    SPAWNED: 'player:spawned',
    MOVED: 'player:moved',
    DIED: 'player:died',
    INTERACT: 'player:interact',
  },

  // Eventos del océano
  OCEAN: {
    WAVE_CREATED: 'ocean:wave-created',
    TIDE_CHANGED: 'ocean:tide-changed',
    SWELL_UPDATED: 'ocean:swell-updated',
  },

  // Eventos del clima
  WEATHER: {
    CHANGED: 'weather:changed',
    WIND_UPDATED: 'weather:wind-updated',
    RAIN_STARTED: 'weather:rain-started',
    RAIN_STOPPED: 'weather:rain-stopped',
  },

  // Eventos de surf
  SURF: {
    RIDE_STARTED: 'surf:ride-started',
    RIDE_ENDED: 'surf:ride-ended',
    SCORE_UPDATED: 'surf:score-updated',
    WAVE_CAUGHT: 'surf:wave-caught',
  },

  // Eventos del vehículo
  VEHICLE: {
    ENGINE_STARTED: 'vehicle:engine-started',
    ENGINE_STOPPED: 'vehicle:engine-stopped',
    FUEL_LOW: 'vehicle:fuel-low',
    FUEL_EMPTY: 'vehicle:fuel-empty',
  },

  // Eventos de inventario
  INVENTORY: {
    ITEM_ADDED: 'inventory:item-added',
    ITEM_REMOVED: 'inventory:item-removed',
    INVENTORY_OPENED: 'inventory:inventory-opened',
    INVENTORY_CLOSED: 'inventory:inventory-closed',
  },

  // Eventos de economía
  ECONOMY: {
    MONEY_CHANGED: 'economy:money-changed',
    PURCHASE: 'economy:purchase',
    SALE: 'economy:sale',
  },

  // Eventos de NPC
  NPC: {
    DIALOGUE_STARTED: 'npc:dialogue-started',
    DIALOGUE_ENDED: 'npc:dialogue-ended',
    QUEST_OFFERED: 'npc:quest-offered',
  },

  // Eventos de interfaz
  UI: {
    MENU_OPENED: 'ui:menu-opened',
    MENU_CLOSED: 'ui:menu-closed',
    TOOLTIP_SHOW: 'ui:tooltip-show',
    TOOLTIP_HIDE: 'ui:tooltip-hide',
  },

  // Eventos de guardado
  SAVE: {
    GAME_SAVED: 'save:game-saved',
    GAME_LOADED: 'save:game-loaded',
    SAVE_ERROR: 'save:save-error',
  },
} as const;

/**
 * Identificadores de escenas
 */
export const SCENE_KEYS = {
  BOOT: 'BootScene',
  PRELOAD: 'PreloadScene',
  MAIN_MENU: 'MainMenuScene',
  WORLD: 'WorldScene',
  SURF: 'SurfScene',
  INTERIOR: 'InteriorScene',
  UI: 'UIScene',
  DEBUG: 'DebugScene',
} as const;

/**
 * Configuración de movimiento
 */
export const MOVEMENT_CONFIG = {
  /** Velocidad de caminar del jugador en píxeles por segundo */
  PLAYER_WALK_SPEED: 150,
  /** Velocidad de correr del jugador en píxeles por segundo */
  PLAYER_RUN_SPEED: 225,
  /** Aceleración del jugador en píxeles por segundo² */
  PLAYER_ACCELERATION: 600,
  /** Desaceleración del jugador en píxeles por segundo² */
  PLAYER_DECELERATION: 400,
  /** Multiplicador de velocidad al caminar */
  WALK_MULTIPLIER: 1,
  /** Multiplicador de velocidad al correr */
  RUN_MULTIPLIER: 1.5,
} as const;

/**
 * Configuración del jugador
 */
export const PLAYER_CONFIG = {
  /** Ancho del sprite del jugador en píxeles */
  SPRITE_WIDTH: 16,
  /** Alto del sprite del jugador en píxeles */
  SPRITE_HEIGHT: 16,
  /** Energía inicial */
  INITIAL_ENERGY: 100,
  /** Salud inicial */
  INITIAL_HEALTH: 100,
} as const;

/**
 * Profundidades de renderizado (z-index)
 */
export const DEPTHS = {
  BACKGROUND: 0,
  TERRAIN: 10,
  WATER: 20,
  OBJECTS: 30,
  NPC: 40,
  PLAYER: 50,
  VEHICLE: 60,
  EFFECTS: 70,
  UI: 100,
  DEBUG: 200,
} as const;
