/**
 * World - Tipos del sistema de mapas
 *
 * Define los tipos para regiones, mapas, metadatos, capas y objetos.
 * Independiente de Phaser.
 */

/**
 * Tipo de objeto en capas de objetos
 */
export type ObjectType =
  | 'PlayerSpawn'
  | 'VanSpawn'
  | 'NPCSpawn'
  | 'SurfTrigger'
  | 'SchoolEntrance'
  | 'Parking'
  | 'WelcomeSign'
  | 'Door'
  | 'CameraTrigger'
  | 'PhotoSpot'
  | 'ItemSpawn'
  | 'ZoneTrigger';

/**
 * Tipo de zona del mapa
 */
export type ZoneType =
  | 'beach'
  | 'urban'
  | 'rural'
  | 'forest'
  | 'mountain'
  | 'road'
  | 'interior'
  | 'underwater';

/**
 * Tipo de clima
 */
export type ClimateType =
  | 'mediterranean'
  | 'oceanic'
  | 'continental'
  | 'tropical'
  | 'arid';

/**
 * Tipo de vehículo permitido
 */
export type VehicleType = 'van' | 'none' | 'all';

/**
 * Conexión con otro mapa
 */
export interface MapConnection {
  /** ID del mapa destino */
  targetMapId: string;
  /** Nombre del objeto Door/Trigger que activa la conexión */
  triggerObject: string;
  /** Posición de spawn en el mapa destino */
  spawnPoint: string;
}

/**
 * Perfil meteorológico de una zona
 */
export interface WeatherProfile {
  /** Probabilidad de lluvia (0-1) */
  rainProbability: number;
  /** Probabilidad de viento (0-1) */
  windProbability: number;
  /** Temperatura media por temporada */
  averageTemperature: {
    spring: number;
    summer: number;
    autumn: number;
    winter: number;
  };
  /** Condiciones de mar predominantes */
  seaConditions: 'calm' | 'moderate' | 'rough' | 'variable';
}

/**
 * Objeto en una capa de objetos
 */
export interface MapObject {
  /** Nombre del objeto (ej: "player-start") */
  name: string;
  /** Tipo del objeto */
  type: ObjectType;
  /** Posición X en píxeles */
  x: number;
  /** Posición Y en píxeles */
  y: number;
  /** Ancho del objeto (opcional) */
  width?: number;
  /** Alto del objeto (opcional) */
  height?: number;
  /** Propiedades adicionales desde Tiled */
  properties?: Record<string, unknown>;
}

/**
 * Configuración de una capa del mapa
 */
export interface LayerConfig {
  /** Nombre de la capa en Tiled */
  name: string;
  /** Tipo de capa */
  type: 'tilemap' | 'object';
  /** Profundidad de renderizado */
  depth: number;
  /** Si la capa tiene colisiones habilitadas */
  collisionEnabled: boolean;
}

/**
 * Configuración de un tileset
 */
export interface TilesetConfig {
  /** Nombre del tileset en Tiled */
  tiledName: string;
  /** Key de la textura en Phaser */
  imageKey: string;
  /** Ruta al archivo de imagen */
  imagePath: string;
  /** Ancho de tile en píxeles */
  tileWidth: number;
  /** Alto de tile en píxeles */
  tileHeight: number;
}

/**
 * Metadatos de un mapa
 */
export interface MapMetadata {
  /** ID del mapa */
  mapId: string;
  /** Nombre legible del mapa */
  name: string;
  /** ID de la región */
  regionId: string;
  /** Tipo de zona */
  zoneType: ZoneType;
  /** Tipo de clima */
  climate: ClimateType;
  /** Música de fondo */
  music: string;
  /** Vehículos permitidos */
  vehiclesAllowed: VehicleType;
  /** Conexiones con otros mapas */
  connections: MapConnection[];
  /** Perfil meteorológico */
  weatherProfile: WeatherProfile;
  /** Hora de amanecer (0-24) */
  sunriseHour: number;
  /** Hora de atardecer (0-24) */
  sunsetHour: number;
}

/**
 * Configuración completa de un mapa
 */
export interface MapConfig {
  /** ID único del mapa */
  id: string;
  /** Nombre legible */
  name: string;
  /** Key del tilemap JSON en Phaser */
  tilemapKey: string;
  /** Directorio relativo en assets/maps */
  directory: string;
  /** Tilesets utilizados */
  tilesets: TilesetConfig[];
  /** Capas del mapa */
  layers: LayerConfig[];
  /** Ancho del mapa en píxeles */
  widthInPixels: number;
  /** Alto del mapa en píxeles */
  heightInPixels: number;
}

/**
 * Configuración de una región
 */
export interface RegionConfig {
  /** ID único de la región */
  id: string;
  /** Nombre legible */
  name: string;
  /** Descripción de la región */
  description: string;
  /** Mapas que pertenecen a esta región */
  maps: string[];
}

/**
 * Estado del MapManager
 */
export interface MapManagerState {
  /** Mapa actual cargado */
  currentMapId: string | null;
  /** Región actual */
  currentRegionId: string | null;
  /** Mapas registrados */
  registeredMaps: Map<string, MapConfig>;
  /** Regiones registradas */
  registeredRegions: Map<string, RegionConfig>;
}
