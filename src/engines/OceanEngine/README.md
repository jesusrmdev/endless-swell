# OceanEngine

Motor de océano para Endless Swell.

## Responsabilidades

- Calcular el estado del océano
- Generar olas
- Gestionar mareas
- Evaluar condiciones de surf

## Dependencias

- **Ninguna** - Este engine es completamente independiente

## Uso

```typescript
import { OceanEngine } from '@engines/OceanEngine';

const ocean = new OceanEngine();
ocean.initialize();

// Obtener estado del océano
const state = ocean.getState();

// Generar una ola
const wave = ocean.generateWave(100, 200);
```

## Archivos

- `OceanEngine.ts` - Implementación principal
- `types.ts` - Tipos de datos
- `interfaces.ts` - Contratos del engine
- `index.ts` - Exportaciones
