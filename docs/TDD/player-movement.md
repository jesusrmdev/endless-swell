# Sistema de Movimiento del Jugador

## Visión General

El sistema de movimiento del jugador está diseñado con separación completa entre lógica y presentación. La arquitectura sigue el patrón Composition over Inheritance y está completamente desacoplada de Phaser.

## Arquitectura

```
┌─────────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                       │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │
│  │   Phaser    │  │   Sprites   │  │     Animations      │ │
│  │  (Render)   │  │  (Visual)   │  │   (Future)          │ │
│  └─────────────┘  └─────────────┘  └─────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    CONTROL LAYER                             │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │              PlayerController                          │ │
│  │  (Coordina Input → Movement → Entity)                  │ │
│  └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                              │
              ┌───────────────┼───────────────┐
              ▼               ▼               ▼
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│   InputService  │ │MovementComponent│ │  PlayerEntity   │
│  (Keyboard)     │ │  (Reusable)     │ │  (Data Only)    │
└─────────────────┘ └─────────────────┘ └─────────────────┘
```

## Componentes

### PlayerEntity (`src/entities/player/PlayerEntity.ts`)
- Entidad pura de datos
- Independiente de Phaser
- Contiene estado: posición, dirección, salud, energía
- NO maneja movimiento directamente

### MovementComponent (`src/components/MovementComponent/MovementComponent.ts`)
- Componente reutilizable para cualquier entidad
- Maneja aceleración, desaceleración, velocidad
- Independiente de Phaser
- Acepta configuración desde datos

### InputService (`src/services/InputService/InputService.ts`)
- Captura input del teclado (flechas, WASD, Shift)
- Abstrae entrada de Phaser
- Calcula dirección normalizada (incluyendo diagonal)

### PlayerController (`src/entities/player/PlayerController.ts`)
- Coordina los tres componentes
- Flujo: InputService → MovementComponent → PlayerEntity
- Actualiza dirección del jugador para animaciones futuras

## Flujo de Datos

```
1. InputService captura teclas presionadas
2. Calcula dirección normalizada (x, y)
3. PlayerController lee dirección
4. Establece dirección en MovementComponent
5. MovementComponent actualiza posición con aceleración
6. PlayerController sincroniza posición con PlayerEntity
7. WorldScene sincroniza sprite con posición
```

## Configuración

### Datos del Jugador (`src/data/entities/player.default.json`)
```json
{
  "movement": {
    "walkSpeed": 150,
    "runSpeed": 225,
    "acceleration": 600,
    "deceleration": 400
  },
  "spawn": {
    "x": 640,
    "y": 360
  }
}
```

### Constantes (`src/core/constants/Constants.ts`)
- `MOVEMENT_CONFIG`: Velocidades y aceleración
- `PLAYER_CONFIG`: Dimensiones sprite, stats iniciales

### Config Centralizada (`src/core/config/Config.ts`)
- `MovementConfig`: Configuración de movimiento cargable

## Controles

- **Flechas / WASD**: Movimiento en 8 direcciones
- **Shift**: Correr (1.5x velocidad)
- **ESC**: Volver al menú principal

## Ventajas de esta Arquitectura

1. **Reutilización**: MovementComponent puede usarse para NPCs, vehículos, etc.
2. **Testeable**: Lógica pura sin dependencias de Phaser
3. **Data-Driven**: Velocidades y spawns se definen en JSON
4. **Extensible**: Fácil agregar animaciones, partículas, etc.
5. **Mantenible**: Cada componente tiene una única responsabilidad
