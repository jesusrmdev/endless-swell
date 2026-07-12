# Roadmap

## Visión General

Endless Swell se desarrollará por versiones, cada una añadiendo nuevas mecánicas y contenido.

## Git Workflow

- `main` protegida — solo recibe merges aprobados
- Ramas: `feature/<nombre>`, `fix/<descripcion>`
- Merge: `git merge --no-ff` (nunca fast-forward)
- Commits descriptivos: `feat(scope): description`
- No auto-eliminar ramas después del merge

## Versiones

### v0.1 - Fundación ✓

- [x] Configuración del proyecto
- [x] Arquitectura base
- [x] Estructura de carpetas
- [x] Engines básicos
- [x] Escenas básicas

### v0.2 - Movimiento ✓

- [x] Movimiento del jugador (WASD/Flechas)
- [x] Correr (Shift)
- [x] InputService con eventos DOM
- [x] MovementComponent reutilizable
- [x] PlayerController (entity + movement + input)
- [x] Datos de jugador data-driven (JSON)

### v0.3 - World Foundation ✓

- [x] TilemapService (wrapper Phaser)
- [x] MapManager (lógica pura, sin Phaser)
- [x] Tipos de mundo (RegionConfig, MapConfig, MapMetadata)
- [x] Primer mapa: Playa de Calblanque (Tiled JSON)
- [x] Tileset placeholder
- [x] Colisiones con bordes del mapa
- [x] PlayerSpawn desde mapa
- [x] ASSETS registry
- [x] Fix: Phaser SetCollisionByExclusion crash (bounds checking)
- [x] Fix: player-placeholder en public/assets

### v0.4 - First Playable World ✓

- [x] Tileset expandido (64 tiles: hierba, camino, agua, arena, rocas, árboles, edificios, parking)
- [x] Mapa 40x30 tiles (640x480 px)
- [x] 5 capas: Ground, Water, Decoration, Collision, Objects
- [x] Objetos: PlayerSpawn, SurfTrigger, SchoolEntrance, Parking, WelcomeSign
- [x] Zonas: bosque, camino, playa, océano, escuela de surf, parking
- [x] Generadores de tileset y mapa para reproducibilidad

### v0.5 - Camera & Presentation System (SPEC-004) ✓

- [x] Sistema de cámara avanzado (CameraService con presets)
- [x] Pixel Perfect Rendering (VirtualResolution 256x224)
- [x] Resolución virtual y escalado
- [x] Zoom configurable
- [x] Preparación para transiciones (TransitionService: Fade, Wipe)
- [x] Preparación para cinemáticas
- [x] Preparación para escenas interiores
- [x] Preparación para modo surf
- [x] Preparación para conducción de camper

### v0.6 - Interaction System (SPEC-005) ✓

- [x] InteractionComponent reutilizable
- [x] InteractionService: detección de proximidad (48px radio)
- [x] Indicador [E] sobre objetos cercanos
- [x] Tecla E ejecuta acciones
- [x] Acciones: SignAction, DoorAction (stub), SchoolEntranceAction (stub)
- [x] Propiedades Tiled se leen correctamente (Phaser 3.60+)
- [x] Mensajes en pantalla con duración configurable

### v0.7 - Conducción

- [ ] Vehículo (furgoneta)
- [ ] Física de conducción
- [ ] Carreteras y mapas
- [ ] Combustible

### v0.8 - NPC

- [ ] Sistema de NPCs
- [ ] Diálogos básicos
- [ ] Interacciones
- [ ] Comportamientos simples

### v0.9 - Inventario

- [ ] Sistema de inventario
- [ ] Tablas de surf
- [ ] Neoprenos
- [ ] Equipamiento

### v0.9 - Surf

- [ ] Mecánicas de surf
- [ ] Olas y swell
- [ ] Puntuación
- [ ] Condiciones del mar

### v1.0 - Economía

- [ ] Sistema monetario
- [ ] Tiendas
- [ ] Compra/venta
- [ ] Precios dinámicos

### v1.1 - Primera Versión Jugable

- [ ] Contenido completo
- [ ] Balanceo
- [ ] Testing
- [ ] Optimización
- [ ] Publicación

---

*Última actualización: 12 de Julio de 2026*
