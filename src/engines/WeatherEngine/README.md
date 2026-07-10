# WeatherEngine

Motor de meteorología para Endless Swell.

## Responsabilidades

- Calcular el estado del clima
- Gestionar transiciones de clima
- Predecir cambios de clima

## Dependencias

- **Ninguna** - Este engine es completamente independiente

## Uso

```typescript
import { WeatherEngine } from '@engines/WeatherEngine';

const weather = new WeatherEngine();
weather.initialize();

// Obtener estado del clima
const state = weather.getState();

// Verificar si está lloviendo
if (weather.isRaining()) {
  console.log('Está lloviendo');
}
```

## Archivos

- `WeatherEngine.ts` - Implementación principal
- `types.ts` - Tipos de datos
- `interfaces.ts` - Contratos del engine
- `index.ts` - Exportaciones
