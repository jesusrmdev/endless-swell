# SPEC-005 — Interaction System

## Estado

✅ **COMPLETADA** — Esperando aprobación para merge

## Resumen

Sistema de interacción general reutilizable. Permite al jugador interactuar con objetos del mundo usando una tecla única (E).

## Archivos Creados

### InteractionComponent
- `src/components/InteractionComponent/InteractionComponent.ts` — Componente reutilizable
- `src/components/InteractionComponent/interfaces.ts` — Contrato del componente
- `src/components/InteractionComponent/types.ts` — Tipos de interacción
- `src/components/InteractionComponent/index.ts` — Exportaciones

### InteractionService
- `src/services/InteractionService/InteractionService.ts` — Servicio principal
- `src/services/InteractionService/interfaces.ts` — Contrato del servicio
- `src/services/InteractionService/types.ts` — Tipos del servicio
- `src/services/InteractionService/index.ts` — Exportaciones

### Acciones
- `src/services/InteractionService/actions/SignAction.ts` — Acción de cartel
- `src/services/InteractionService/actions/DoorAction.ts` — Acción de puerta
- `src/services/InteractionService/actions/SchoolEntranceAction.ts` — Acción de escuela
- `src/services/InteractionService/actions/index.ts` — Exportaciones

## Archivos Modificados

- `src/entities/player/PlayerController.ts` — Agregado `getInputService()`
- `src/scenes/WorldScene/WorldScene.ts` — Integrado InteractionService + messageActive flag
- `src/world/TilemapService/TilemapService.ts` — `normalizeProperties()` para formato Phaser 3.60+
- `scripts/generate-map.py` — Propiedades Tiled en objetos (message en WelcomeSign)
- `public/assets/maps/murcia/playa-calblanque/playa-calblanque.tmj` — Regenerado con propiedades

## Arquitectura

### Flujo de Datos

```
PlayerController → InputService (E key) → InteractionService → Action → Result
                         ↑
                  Tilemap Objects
```

### Componentes

| Componente | Responsabilidad |
|------------|-----------------|
| **InteractionComponent** | Define radio, tipo de acción, datos |
| **InteractionService** | Detecta objetos cercanos, muestra indicador, ejecuta acciones |
| **SignAction** | Muestra mensaje de cartel |
| **DoorAction** | Ejecuta acción de puerta |
| **SchoolEntranceAction** | Ejecuta acción de escuela |

### API del InteractionService

```typescript
initialize(scene: Phaser.Scene): void
registerObject(object: InteractiveObject): void
registerObjects(objects: InteractiveObject[]): void
unregisterObject(id: string): void
update(playerPosition: { x: number; y: number }, delta: number): void
getNearestObject(): InteractiveObject | null
interact(): InteractionResult | null
getIndicatorState(): IndicatorState
hasInteractionAvailable(): boolean
destroy(): void
```

### Objetos Interactivos

| Tipo | Acción | Ejemplo |
|------|--------|---------|
| WelcomeSign | SignAction | Cartel de bienvenida |
| Door | DoorAction | Puerta de edificio |
| SchoolEntrance | SchoolEntranceAction | Entrada escuela de surf |

## Bug Fixes (durante testing)

### 1. Radio de detección insuficiente
- **Problema**: Radio 32px, jugador spawneaba a 36px del cartel más cercano
- **Solución**: Radio aumentado a 48px

### 2. Propiedades Tiled no se leían
- **Problema**: Phaser 3.60+ devuelve propiedades como array `[{name,type,value}]`, no objeto plano
- **Solución**: `normalizeProperties()` en TilemapService convierte ambos formatos

### 3. Mensaje sobreescrito en mismo frame
- **Problema**: `showInteractionMessage()` seteaba el texto, luego el prompt lo sobreescritaba inmediatamente
- **Solución**: Flag `interactionMessageActive` que bloquea el prompt mientras se muestra un mensaje

## Verificación

- ✅ TypeScript compila sin errores
- ✅ Build correcto
- ✅ InteractionService integrado en WorldScene
- ✅ Objetos interactivos se registran desde mapa
- ✅ Indicador [E] aparece al acercarse (radio 48px)
- ✅ Tecla E ejecuta acciones
- ✅ Mensajes se muestran durante 2 segundos sin sobreescritura
- ✅ Propiedades Tiled se leen correctamente (formato array y objeto)
- ✅ Arquitectura desacoplada
- ✅ Sistema reutilizable para futuros objetos

## Git

- **Rama**: `feature/interaction-system`
- **Commits**: `964b05a`, `9e06e13`, `32e28a5`
- **Esperando**: `MERGE APPROVED`
