# SPEC-004 — Camera & Presentation System

## Estado

✅ **COMPLETADA** — Esperando aprobación para merge

## Resumen

Sistema de cámara y presentación profesional inspirado en Pokémon Game Boy Color. Incluye resolución virtual, presets de cámara, y sistema de transiciones.

## Archivos Creados

### Core
- `src/core/rendering/VirtualResolution.ts` — Gestor de resolución virtual (256x224)
- `src/core/rendering/index.ts` — Exportaciones

### CameraService
- `src/services/CameraService/CameraService.ts` — Gestión principal de cámara
- `src/services/CameraService/CameraPresets.ts` — Presets predefinidos
- `src/services/CameraService/interfaces.ts` — Tipos de cámara
- `src/services/CameraService/index.ts` — Exportaciones

### TransitionService
- `src/services/TransitionService/TransitionService.ts` — Gestión de transiciones
- `src/services/TransitionService/effects/FadeEffect.ts` — Efecto de fundido
- `src/services/TransitionService/effects/WipeEffect.ts` — Efecto de barrido
- `src/services/TransitionService/interfaces.ts` — Tipos de transición
- `src/services/TransitionService/index.ts` — Exportaciones

## Archivos Modificados

- `src/core/constants/Constants.ts` — Agregados `CAMERA_PRESETS` y `VIRTUAL_RESOLUTION`
- `src/core/config/Config.ts` — Agregado `CameraConfig` interface
- `src/scenes/WorldScene/WorldScene.ts` — Integrado CameraService

## Arquitectura

### Flujo de Datos

```
Game Logic → VirtualResolution (256x224) → RenderTexture → Screen
                       ↑
               CameraService
               (follow, bounds, zoom)
```

### Presets de Cámara

| Preset | Zoom | Deadzone | Lerp | Uso |
|--------|------|----------|------|-----|
| OVERWORLD | 1.0 | 80x60 | 0.1 | Exploración normal |
| SURF | 1.2 | 100x80 | 0.08 | Modo surf |
| INTERIOR | 1.0 | 60x50 | 0.1 | Edificios |
| VEHICLE | 0.8 | 120x100 | 0.05 | Conducción |
| MENU | 1.0 | 0x0 | 0.1 | Menús |

### CameraService API

```typescript
initialize(scene: Phaser.Scene): void
setPreset(preset: CameraPreset): void
getCurrentPreset(): CameraPreset
follow(target: Phaser.GameObjects.Sprite): void
stopFollow(): void
setBounds(bounds: CameraBounds): void
setZoom(zoom: number): void
shake(duration?: number, intensity?: number): void
flash(duration?: number, color?: number): void
destroy(): void
```

### TransitionService API

```typescript
initialize(scene: Phaser.Scene): void
fadeToBlack(duration?: number, color?: number): Promise<TransitionResult>
fadeFromBlack(duration?: number, color?: number): Promise<TransitionResult>
wipeTransition(direction?: TransitionDirection, duration?: number): Promise<TransitionResult>
transitionToMap(mapKey: string, spawnPoint: string): Promise<TransitionResult>
isTransitioning(): boolean
destroy(): void
```

### VirtualResolution

- Resolución virtual: 256x224 píxeles
- RenderTexture a resolución virtual
- Escalado automático a tamaño de pantalla
- Pixel perfect rendering sin distorsión

## Verificación

- ✅ TypeScript compila sin errores
- ✅ Build correcto
- ✅ CameraService integrado en WorldScene
- ✅ Preset OVERWORLD aplicado por defecto
- ✅ Bounds de cámara desde tilemap
- ✅ Seguimiento de jugador via CameraService
- ✅ Limpieza de recursos en shutdown
- ✅ Arquitectura desacoplada de Phaser
- ✅ Preparado para surf, interiores, conducción

## Preparación para Futuros Sistemas

| Sistema | Cómo se Integra |
|---------|-----------------|
| Surf | `CameraService.setPreset(SURF)` |
| Interior | `TransitionService.fadeToBlack()` + bounds + `INTERIOR` |
| Conducción | `CameraService.setPreset(VEHICLE)` |
| Cinemáticas | Extensión futura de CameraService |
| Transiciones | `TransitionService.transitionToMap()` |

## Git

- **Rama**: `feature/camera-presentation-system`
- **Commits**: Pendientes
- **Esperando**: `MERGE APPROVED`
