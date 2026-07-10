# Endless Swell

**RPG 2D de exploración centrado en el surf y los viajes**

[![CI](https://github.com/jesusrmdev/endless-swell/actions/workflows/ci.yml/badge.svg)](https://github.com/jesusrmdev/endless-swell/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![Phaser](https://img.shields.io/badge/Phaser-3-green.svg)](https://phaser.io)

---

## Sobre el Juego

**Endless Swell** es un RPG 2D de exploración donde el jugador recorre España en furgoneta camper buscando las mejores olas. Sin monstruos, sin combate. El océano es el protagonista.

### Filosofía del Juego

- El mar es el verdadero protagonista
- Cada playa tiene personalidad propia
- Cada día es diferente
- El conocimiento vale más que el dinero
- El viaje es más importante que el destino
- El surf debe sentirse auténtico
- Libertad, aventura y respeto por el océano

---

## Características Principales

- Exploración en mundo abierto
- Conducción de una furgoneta camper
- Descubrimiento de spots de surf
- Meteorología dinámica
- Condiciones reales del mar
- Sistema de surf auténtico
- Economía y comercio
- NPCs con personalidad
- Historia y misiones
- Diario del surfista

---

## Stack Tecnológico

- **Motor:** [Phaser 3](https://phaser.io)
- **Lenguaje:** [TypeScript](https://www.typescriptlang.org/)
- **Bundler:** [Vite](https://vitejs.dev/)
- **Edición de Mapas:** [Tiled](https://www.mapeditor.org/)
- **Arte:** [Aseprite](https://www.aseprite.org/)

---

## Arquitectura

### Principios Fundamentales

1. **Phaser como infraestructura** - Phaser solo maneja render, input, escenas, cámara y audio
2. **Data Driven** - Todo el contenido se define mediante datos, no código
3. **Independencia** - Cada engine es completamente independiente
4. **Separación de responsabilidades** - Lógica, datos, render, audio y UI nunca se mezclan

### Estructura del Proyecto

```
src/
├── core/           # Núcleo del juego
├── engines/        # Motores independientes
├── scenes/         # Escenas de Phaser
├── entities/       # Entidades del juego
├── world/          # Construcción del mundo
├── data/           # Datos del juego
├── ui/             # Interfaz de usuario
├── assets/         # Recursos visuales y audio
├── services/       # Capa de acceso
├── types/          # Tipos globales
├── interfaces/     # Interfaces globales
├── utils/          # Utilidades compartidas
└── tests/          # Tests
```

### Engines

| Engine | Responsabilidad |
|--------|-----------------|
| OceanEngine | Olas, mareas, swell, corrientes |
| WeatherEngine | Meteorología, viento, nubes |
| SurfEngine | Mecánicas de surf, puntuación |
| VehicleEngine | Conducción de la furgoneta |
| InventoryEngine | Gestión de inventario |
| EconomyEngine | Dinero, comercio, precios |
| DialogueEngine | Sistema de diálogos NPC |
| ReputationEngine | Reputación con facciones |
| QuestEngine | Misiones y objetivos |
| TimeEngine | Hora del día, estaciones |
| TravelEngine | Viajes entre regiones |
| JournalEngine | Diario del surfista |
| PhotoEngine | Captura de fotos |

---

## Desarrollo

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/jesusrmdev/endless-swell.git
cd endless-swell

# Instalar dependencias
npm install

# Iniciar en modo desarrollo
npm run dev
```

### Comandos Disponibles

```bash
npm run dev          # Iniciar servidor de desarrollo
npm run build        # Construir para producción
npm run preview      # Vista previa de la build
npm run lint         # Verificar código
npm run lint:fix     # Corregir código
npm run format       # Formatear código
npm run typecheck    # Verificar tipos
```

### Roadmap

- [x] v0.1 - Fundación del proyecto
- [ ] v0.2 - Movimiento
- [ ] v0.3 - Cámara
- [ ] v0.4 - Mundo
- [ ] v0.5 - Conducción
- [ ] v0.6 - NPC
- [ ] v0.7 - Inventario
- [ ] v0.8 - Surf
- [ ] v0.9 - Economía
- [ ] v1.0 - Primera versión jugable

Ver [Roadmap completo](docs/Roadmap/README.md)

---

## Documentación

- [Game Design Document](docs/GDD/README.md)
- [Technical Design Document](docs/TDD/README.md)
- [Art Bible](docs/ArtBible/README.md)
- [Lore del Mundo](docs/Lore/README.md)
- [Changelog](docs/Changelog/README.md)

---

## Contribuir

Las contribuciones son bienvenidas. Por favor, lee el [guía de contribución](CONTRIBUTING.md) antes de abrir un Pull Request.

1. Haz fork del repositorio
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Haz commit de tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

---

## Licencia

Este proyecto está licenciado bajo la MIT License - mira el archivo [LICENSE](LICENSE) para detalles.

---

## Contacto

- **GitHub:** [jesusrmdev](https://github.com/jesusrmdev)

---

*Construido con pasión para la comunidad del surf* 🏄
