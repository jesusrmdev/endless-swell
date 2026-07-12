# SPEC-004 — Camera & Presentation System

## Estado

✅ **COMPLETADA Y CERRADA**

## Resumen

Infraestructura del sistema de cámara y presentación profesional. **Esta SPEC construye únicamente la base arquitectónica.** No introduce cambios visuales ni mecánicas nuevas.

Los sistemas creados comenzarán a utilizarse cuando las futuras SPECs los requieran:
- **Surf** → CameraPreset SURF
- **Interiores** → TransitionService + CameraPreset INTERIOR
- **Conducción** → CameraPreset VEHICLE
- **Cinemáticas** → CameraService + TransitionService
- **Transiciones entre mapas** → TransitionService

## Objetivo

Construir la infraestructura preparada para:
- Resolución virtual pixel-perfect (256x224)
- Presets de cámara por contexto
- Sistema de transiciones (fade, wipe)
- Efectos de cámara (shake, flash)
- Adaptación a distintos modos de juego

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

### Presets de Cámara

| Preset | Zoom | Deadzone | Lerp | Uso Futuro |
|--------|------|----------|------|------------|
| OVERWORLD | 1.0 | 80x60 | 0.1 | Exploración (ya activo) |
| SURF | 1.2 | 100x80 | 0.08 | Modo surf (SPEC surf) |
| INTERIOR | 1.0 | 60x50 | 0.1 | Edificios (SPEC interiores) |
| VEHICLE | 0.8 | 120x100 | 0.05 | Conducción (SPEC conducción) |
| MENU | 1.0 | 0x0 | 0.1 | Menús (futuro) |

### CameraService API

```typescript
initialize(scene: Phaser.Scene): void
setPreset(preset: CameraPreset): void
follow(target: Phaser.GameObjects.Sprite): void
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

## Verificación

- ✅ TypeScript compila sin errores
- ✅ Build correcto
- ✅ CameraService integrado en WorldScene (preset OVERWORLD activo)
- ✅ Arquitectura desacoplada de Phaser
- ✅ Infraestructura lista para uso en futuras SPECs

## Nota sobre Visibilidad

**No hay cambios visuales en esta SPEC.** Esto es intencional.

La infraestructura existe para ser utilizada progresivamente:
- Las transiciones se activarán al cambiar de mapa
- Los presets de zoom se aplicarán al entrar en agua/edificios
- Los efectos de cámara se usarán en eventos específicos
- La resolución virtual se activará cuando se necesite pixel-perfect rendering

## Git

- **Rama**: `feature/camera-presentation-system`
- **Commit**: `ac5f90b`
- **Estado**: Cerrada, pendiente de merge
