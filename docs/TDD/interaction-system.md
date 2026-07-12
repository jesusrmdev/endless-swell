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
- `src/scenes/WorldScene/WorldScene.ts` — Integrado InteractionService

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

## Verificación

- ✅ TypeScript compila sin errores
- ✅ Build correcto
- ✅ InteractionService integrado en WorldScene
- ✅ Objetos interactivos se registran desde mapa
- ✅ Indicador [E] aparece al acercarse
- ✅ Tecla E ejecuta acciones
- ✅ Mensajes se muestran en pantalla
- ✅ Arquitectura desacoplada
- ✅ Sistema reutilizable para futuros objetos

## Git

- **Rama**: `feature/interaction-system`
- **Commits**: Pendientes
- **Esperando**: `MERGE APPROVED`
