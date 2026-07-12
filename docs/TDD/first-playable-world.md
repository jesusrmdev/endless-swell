# SPEC-003 — First Playable World

## Estado

✅ **COMPLETADA** — Esperando aprobación para merge

## Resumen

Primer escenario jugable de Endless Swell. Mapa de 40x30 tiles (640x480 px) con estética Pokémon Game Boy Color.

## Archivos Modificados

### Nuevos
- `scripts/generate-tileset.py` — Generador de tileset placeholder
- `scripts/generate-map.py` — Generador de mapa Tiled JSON

### Modificados
- `public/assets/tilesets/terrain-placeholder.png` — Expandido a 128x128 (64 tiles)
- `public/assets/maps/murcia/playa-calblanque/playa-calblanque.tmj` — Mapa 40x30
- `src/data/maps/playa-calblanque.json` — Config actualizada con 5 capas
- `src/world/types.ts` — Nuevos tipos: SchoolEntrance, Parking, WelcomeSign

## Arquitectura del Mapa

### Capas
| Capa | Tipo | Profundidad | Colisión |
|------|------|-------------|----------|
| Ground | tilemap | 10 | No |
| Water | tilemap | 20 | Sí |
| Decoration | tilemap | 25 | No |
| Collision | tilemap | 10 | Sí |
| Objects | object | 30 | No |

### Objetos
| Nombre | Tipo | Posición |
|--------|------|----------|
| player-start | PlayerSpawn | (304, 240) |
| surf-trigger | SurfTrigger | (480, 240) |
| school-entrance | SchoolEntrance | (224, 384) |
| parking-area | Parking | (32, 320) |
| welcome-sign | WelcomeSign | (272, 224) |

### Tileset (64 tiles)
- **Row 0**: Empty, Grass, Path, Wall, Water, Sand, Rock, Trunk
- **Row 1**: GrassDark, GrassLight, PathLight, PathDark, WaterLight, SandLight, RockLight, Leaves
- **Row 2**: BuildingWall, BuildingDark, Door, Sign, Parking, ParkingLine, Pool, SandDark
- **Row 3-7**: Variaciones de terreno

### Zonas del Mapa
- **Norte-Oeste**: Bosque (árboles + hierba)
- **Centro**: Camino principal vertical
- **Este**: Playa + océano
- **Sur-Oeste**: Parking
- **Sur-Centro**: Escuela de surf (edificio)

## Verificación

- ✅ TypeScript compila sin errores
- ✅ Build correcto
- ✅ Mapa carga correctamente (5 capas)
- ✅ Tileset expandido (64 tiles)
- ✅ Spawn del jugador en camino
- ✅ Colisiones configuradas (Water + Collision)
- ✅ Cámaras configuran bounds automáticamente
- ✅ Arquitectura existente intacta

## Criterios de Aceptación

- ✅ Mapa carga correctamente
- ✅ Jugador aparece en spawn
- ✅ Cámara sigue al jugador
- ✅ Jugador puede recorrer el escenario
- ✅ Colisiones funcionan (Water + Collision layers)
- ✅ Mapa ocupa superficie suficiente (640x480 px)
- ✅ Arquitectura existente permanece intacta
- ✅ TypeScript compila sin errores
- ✅ Build correcto
- ✅ Documentación actualizada (este archivo)

## Git

- **Rama**: `feature/first-playable-world`
- **Commit**: `61d115e`
- **Push**: OK
- **Esperando**: `MERGE APPROVED`
