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
- [x] Cámara sigue al jugador
- [x] PlayerSpawn desde mapa
- [x] ASSETS registry
- [x] Fix: Phaser SetCollisionByExclusion crash (bounds checking)
- [x] Fix: player-placeholder en public/assets

### v0.4 - Cámara

- [ ] Sistema de cámara avanzado
- [ ] Límites del mundo
- [ ] Transiciones entre áreas

### v0.5 - Conducción

- [ ] Vehículo (furgoneta)
- [ ] Física de conducción
- [ ] Carreteras y mapas
- [ ] Combustible

### v0.6 - NPC

- [ ] Sistema de NPCs
- [ ] Diálogos básicos
- [ ] Interacciones
- [ ] Comportamientos simples

### v0.7 - Inventario

- [ ] Sistema de inventario
- [ ] Tablas de surf
- [ ] Neoprenos
- [ ] Equipamiento

### v0.8 - Surf

- [ ] Mecánicas de surf
- [ ] Olas y swell
- [ ] Puntuación
- [ ] Condiciones del mar

### v0.9 - Economía

- [ ] Sistema monetario
- [ ] Tiendas
- [ ] Compra/venta
- [ ] Precios dinámicos

### v1.0 - Primera Versión Jugable

- [ ] Contenido completo
- [ ] Balanceo
- [ ] Testing
- [ ] Optimización
- [ ] Publicación

---

*Última actualización: 12 de Julio de 2026*
