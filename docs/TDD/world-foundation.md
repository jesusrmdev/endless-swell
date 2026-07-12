# Sistema de Mapas y Regiones (SPEC-002)

## Visión General

Sistema de gestión de mapas construidos con Tiled. Separación completa entre infraestructura Phaser y lógica del juego.

## Arquitectura

```
src/
├── world/
│   ├── types.ts                    # Tipos: Region, Map, Metadata, Layers, Objects
│   ├── TilemapService/             # Wrapper de Phaser (único con dependencia)
│   │   ├── TilemapService.ts
│   │   ├── interfaces.ts
│   │   └── index.ts
│   ├── MapManager/                 # Lógica pura (sin Phaser)
│   │   ├── MapManager.ts
│   │   ├── interfaces.ts
│   │   └── index.ts
│   └── index.ts
│
├── data/
│   ├── regions/                    # Configuración de regiones
│   │   └── murcia.json
│   └── maps/                       # Configuración de mapas
│       └── playa-calblanque.json
│
└── assets/
    ├── maps/                       # Tilesets de Tiled (JSON export)
    │   └── murcia/playa-calblanque/
    │       ├── playa-calblanque.tmj
    │       └── playa-calblanque.meta.json
    └── tilesets/                   # Imágenes de tilesets
        └── terrain-placeholder.png
```

## Componentes

### TilemapService (Phaser wrapper)

Único componente que depende de Phaser. Gestiona:
- Carga de tilemap JSON y tileset imágenes
- Creación de capas en orden
- Configuración de colisiones por capa
- Extracción de objetos de capas de objetos

```typescript
interface ITilemapService {
  initialize(scene: Phaser.Scene): void;
  loadMap(tilemapKey, tilesetConfigs): void;
  createTilemapLayer(layerName, tilesetKeys, depth): void;
  setCollisionByExclusion(layerName, excludedIndices): void;
  getObjectsFromLayer(layerName): MapObject[];
  getObjectByName(layerName, objectName): MapObject | null;
  getPhaserLayer(layerName): TilemapLayer | null;
  getPhaserMap(): Tilemap | null;
  clearMap(): void;
  destroy(): void;
}
```

### MapManager (Lógica pura)

Gestiona regiones y mapas sin dependencias de Phaser:
- Registro de regiones y mapas
- Carga de mapas actual
- Transiciones entre mapas
- Consultas por región

```typescript
interface IMapManager {
  initialize(): void;
  registerRegion(region: RegionConfig): void;
  registerMap(map: MapConfig): void;
  loadMap(mapId: string): boolean;
  getCurrentMap(): MapConfig | null;
  getCurrentRegion(): RegionConfig | null;
  getMapsByRegion(regionId: string): MapConfig[];
  destroy(): void;
}
```

## Tipos Principales

### RegionConfig
```typescript
interface RegionConfig {
  id: string;
  name: string;
  description: string;
  maps: string[];
}
```

### MapConfig
```typescript
interface MapConfig {
  id: string;
  name: string;
  tilemapKey: string;
  directory: string;
  tilesets: TilesetConfig[];
  layers: LayerConfig[];
  widthInPixels: number;
  heightInPixels: number;
}
```

### MapMetadata
```typescript
interface MapMetadata {
  mapId: string;
  name: string;
  regionId: string;
  zoneType: 'beach' | 'urban' | 'rural' | ...;
  climate: 'mediterranean' | 'oceanic' | ...;
  music: string;
  vehiclesAllowed: 'van' | 'none' | 'all';
  connections: MapConnection[];
  weatherProfile: WeatherProfile;
  sunriseHour: number;
  sunsetHour: number;
}
```

### LayerConfig
```typescript
interface LayerConfig {
  name: string;
  type: 'tilemap' | 'object';
  depth: number;
  collisionEnabled: boolean;
}
```

### MapObject
```typescript
interface MapObject {
  name: string;
  type: 'PlayerSpawn' | 'VanSpawn' | 'NPCSpawn' | 'SurfTrigger' | 'Door' | ...;
  x: number;
  y: number;
  width?: number;
  height?: number;
  properties?: Record<string, unknown>;
}
```

## Capas del Mapa

Cada mapa debe tener estas capas en Tiled:

| Capa | Tipo | Profundidad | Descripción |
|---|---|---|---|
| Ground | Tilemap | 10 | Suelo base |
| Collision | Tilemap | 10 | Tiles colisionables |
| Interaction | Tilemap | 10 | Zonas de interacción |
| Navigation | Tilemap | 10 | Zonas de navegación |
| Water | Tilemap | 20 | Agua |
| Objects | Object | 30 | Spawn points, triggers, etc. |
| Foreground | Tilemap | 40 | Primer plano |

## Objetos en Capa Objects

| Tipo | Descripción |
|---|---|
| PlayerSpawn | Punto de aparición del jugador |
| VanSpawn | Punto de aparición de la furgoneta |
| NPCSpawn | Punto de aparición de NPC |
| SurfTrigger | Zona de inicio de surf |
| Door | Puerta/portal a otro mapa |
| CameraTrigger | Zona que activa cámara |
| PhotoSpot | Punto de interés fotográfico |
| ItemSpawn | Punto de aparición de items |
| ZoneTrigger | Zona genérica de trigger |

## Flujo de Carga

```
1. WorldScene.create()
   │
   ├── MapManager.registerRegion(regionData)
   ├── MapManager.registerMap(mapConfig)
   │
   ├── TilemapService.initialize(this)
   │
   ├── tryLoadTilemap()
   │   ├── this.load.tilemapTiledJSON(key, path)
   │   ├── this.load.image(tilesetKey, imagePath)
   │   └── onMapLoaded()
   │       ├── TilemapService.loadMap(key, tilesets)
   │       ├── TilemapService.createTilemapLayer() × N
   │       ├── TilemapService.setCollisionByExclusion()
   │       └── this.physics.add.collider(player, layer)
   │
   ├── getObjectByName('Objects', 'player-start')
   │   └── PlayerEntity.setPosition(spawnPoint)
   │
   └── Camera.setBounds(map.width, map.height)
```

## Workflow de Tiled

1. Crear mapa en Tiled (orthogonal, 16x16 tiles)
2. Crear capas: Ground, Collision, Objects, etc.
3. Añadir objetos en capa Objects (PlayerSpawn, etc.)
4. Exportar como JSON (`.tmj`)
5. Colocar en `src/assets/maps/{region}/{mapa}/`
6. Crear `.meta.json` con metadatos
7. Crear config del mapa en `src/data/maps/`
8. Registrar región en `src/data/regions/`

## Archivos de Ejemplo

- `src/data/regions/murcia.json` - Región de Murcia
- `src/data/maps/playa-calblanque.json` - Config del mapa
- `src/assets/maps/murcia/playa-calblanque/playa-calblanque.tmj` - Tilemap Tiled
- `src/assets/maps/murcia/playa-calblanque/playa-calblanque.meta.json` - Metadatos
- `src/assets/tilesets/terrain-placeholder.png` - Tileset placeholder
