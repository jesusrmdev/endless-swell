# Changelog

Todos los cambios notables en Endless Swell.

El formato se basa en [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/).

---

## [0.5.0] - 2026-07-12

### Added

- InteractionComponent: componente reutilizable para objetos interactivos
- InteractionService: detección de proximidad, indicador [E], ejecución de acciones
- Acciones: SignAction (cartel), DoorAction (stub), SchoolEntranceAction (stub)
- normalizeProperties() en TilemapService para formato Phaser 3.60+
- Propiedades Tiled en objetos del mapa (message en WelcomeSign)
- Flag interactionMessageActive para evitar sobreescritura de mensajes

### Changed

- Radio de interacción: 32px → 48px para mejor descubrimiento
- PlayerController: agregado getInputService()
- generate-map.py: objetos con propiedades Tiled

---

## [0.4.0] - 2026-07-12

### Added

- Tileset expandido a 128x128 (64 tiles) con terrenos, edificios, objetos
- Mapa 40x30 tiles (640x480 px) con estética Pokémon GBC
- 5 capas: Ground, Water, Decoration, Collision, Objects
- 5 objetos: PlayerSpawn, SurfTrigger, SchoolEntrance, Parking, WelcomeSign
- Zonas: bosque, camino principal, playa, océano, escuela de surf, parking
- Scripts generadores: `generate-tileset.py`, `generate-map.py`
- Tipos: SchoolEntrance, Parking, WelcomeSign en ObjectType

### Changed

- Map config actualizado con capas Water y Decoration

---

## [0.3.0] - 2026-07-12

### Added

- TilemapService: wrapper Phaser para tilemaps de Tiled
- MapManager: lógica pura de regiones y mapas (sin Phaser)
- Tipos: RegionConfig, MapConfig, MapMetadata, LayerConfig, TilesetConfig, MapObject
- Tileset placeholder 64x64
- Mapa Tiled JSON (playa-calblanque)
- Colisiones con bordes del mapa
- PlayerSpawn desde mapa
- ASSETS registry para sprites
- Fix: Phaser SetCollisionByExclusion crash (bounds checking)
- Fix: player-placeholder en public/assets

---

## [0.2.0] - 2026-07-11

### Added

- MovementComponent reutilizable (sin dependencias Phaser)
- PlayerController: coordinación entity + movement + input
- InputService: eventos DOM de teclado (no Phaser keyboard)
- PlayerEntity: estado y comportamiento del jugador
- Datos de jugador data-driven (player.default.json)
- Constantes: MOVEMENT_CONFIG, PLAYER_CONFIG, DEPTHS
- Path alias: `@components/*`

---

## [0.1.0] - 2026-07-11

### Added

- Proyecto Vite + TypeScript + Phaser 3
- Estructura de carpetas por dominio
- Escenas: Boot, Preload, MainMenu, World
- Configuración base del juego
- Git workflow establecido
