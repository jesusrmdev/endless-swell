# Estado del Proyecto

**Fecha:** 12 de Julio de 2026
**Último merge:** `5ebef2f` (main)

---

## Especificaciones Completadas

| # | Nombre | Rama | Merge |
|---|--------|------|-------|
| SPEC-001 | Fundación | (integrada en main) | `6aaca8f` |
| SPEC-002 | World Foundation | `feature/world-foundation` | `4c99270` |
| SPEC-003 | First Playable World | `feature/first-playable-world` | `5ebef2f` |

## Especificaciones Pendientes

| # | Nombre | Estado |
|---|--------|--------|
| SPEC-004 | Camera & Presentation System | En análisis |
| SPEC-005 | Conducción | Pendiente |
| SPEC-006 | NPC | Pendiente |
| SPEC-007 | Inventario | Pendiente |
| SPEC-008 | Surf | Pendiente |
| SPEC-009 | Economía | Pendiente |

## Arquitectura Actual

### Componentes
- **Scenes**: Boot, Preload, MainMenu, World
- **Entities**: PlayerEntity, PlayerController
- **Components**: MovementComponent
- **Services**: InputService
- **World**: TilemapService, MapManager
- **Data**: player.default.json, murcia.json, playa-calblanque.json

### Assets
- Tileset: 128x128 (64 tiles)
- Mapa: 40x30 tiles (640x480 px)
- Sprite jugador: 16x16 placeholder

### Stack
- TypeScript
- Phaser 3.90.0
- Vite 8.1.4
- Tiled (JSON format)

## Commits Recientes

```
5ebef2f Merge feature/first-playable-world into main
af89aa1 docs: SPEC-003 first playable world technical report
61d115e feat(world): first playable world — 40x30 tilemap with 5 layers
4c99270 Merge feature/world-foundation into main
2cb4dd1 docs: update roadmap — v0.1, v0.2, v0.3 marked complete
```

## Próximo Paso

**SPEC-004 — Camera & Presentation System**

Análisis de arquitectura en curso. Esperando diseño técnico para aprobación.
