/**
 * OceanEngine - Motor de océano
 *
 * Calcula el estado del océano, olas, mareas y condiciones de surf.
 * Este engine es completamente independiente de otros engines.
 */

import type { IOceanEngine } from './interfaces';
import type { OceanState, BeachOceanData, Wave, SwellDirection, WaveHeight } from './types';

export class OceanEngine implements IOceanEngine {
  private state: OceanState;
  private waves: Wave[] = [];
  private waveIdCounter: number = 0;

  constructor() {
    this.state = this.createDefaultState();
  }

  initialize(): void {
    console.log('[OceanEngine] Initialized');
  }

  update(_delta: number): void {
    // TODO: Implementar lógica de actualización
  }

  getState(): OceanState {
    return { ...this.state };
  }

  setState(state: OceanState): void {
    this.state = { ...state };
  }

  calculateBeachConditions(_beachData: BeachOceanData): OceanState {
    // TODO: Implementar cálculo de condiciones
    return this.getState();
  }

  generateWave(x: number, y: number): Wave {
    const wave: Wave = {
      id: `wave-${this.waveIdCounter++}`,
      height: 1,
      period: 10,
      direction: this.state.swell.direction,
      x,
      y,
      speed: 5,
    };
    this.waves.push(wave);
    return wave;
  }

  getActiveWaves(): Wave[] {
    return [...this.waves];
  }

  calculateSurfQuality(_beachData: BeachOceanData): number {
    // TODO: Implementar cálculo de calidad
    return 50;
  }

  areConditionsSuitable(_beachData: BeachOceanData, _playerLevel: number): boolean {
    // TODO: Implementar verificación de condiciones
    return true;
  }

  getSwellDirection(): SwellDirection {
    return this.state.swell.direction;
  }

  getSwellHeight(): WaveHeight {
    return this.state.swell.height;
  }

  destroy(): void {
    this.waves = [];
    console.log('[OceanEngine] Destroyed');
  }

  private createDefaultState(): OceanState {
    return {
      swell: {
        direction: 270,
        height: 1,
        period: 10,
        groups: 3,
      },
      wind: {
        direction: 180,
        speed: 10,
        gustSpeed: 15,
      },
      tide: 'mid',
      condition: 'calm',
      waterTemperature: 18,
      seabed: 'sand',
    };
  }
}
