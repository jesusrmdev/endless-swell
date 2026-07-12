# Technical Design Document (TDD)

## Arquitectura del Sistema

### Principios Fundamentales

1. **Phaser como capa de infraestructura**: Phaser únicamente maneja render, input, escenas, cámara y audio.
2. **Data Driven**: Todo el contenido se define mediante datos, no código.
3. **Independencia de Engines**: Cada engine es completamente independiente.
4. **Separación de responsabilidades**: Lógica, datos, render, audio y UI nunca se mezclan.

### Diagrama de Arquitectura

```
┌─────────────────────────────────────────────────────────────┐
│                     PRESENTATION LAYER                       │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │
│  │   Phaser    │  │  Scenes     │  │   UI Components     │ │
│  │  (Render)   │  │  (Scenes)   │  │   (UI Layer)        │ │
│  └─────────────┘  └─────────────┘  └─────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     APPLICATION LAYER                        │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │
│  │  Services   │  │   Engines   │  │   Event Bus         │ │
│  │  (Access)   │  │  (Logic)    │  │   (Communication)   │ │
│  └─────────────┘  └─────────────┘  └─────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                       DATA LAYER                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │
│  │    Data     │  │    Save     │  │   Configuration     │ │
│  │  (Content)  │  │  (Storage)  │  │   (Settings)        │ │
│  └─────────────┘  └─────────────┘  └─────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### Documentos

- [Sistema de Events](./event-system.md)
- [Comunicación entre Engines](./engine-communication.md)
- [Patrones de Diseño](./design-patterns.md)
- [Sistema de Movimiento del Jugador](./player-movement.md)
- [Sistema de Mapas y Regiones](./world-foundation.md)

---

*Este documento será expandido a medida que se implementen los sistemas.*
