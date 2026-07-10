/**
 * SurfEngine - Motor de surf
 */

import type { ISurfEngine } from './interfaces';
import type { SurfState, SurfRide, SurfDifficulty } from './types';

export class SurfEngine implements ISurfEngine {
  private state: SurfState;

  constructor() {
    this.state = this.createDefaultState();
  }

  initialize(): void {
    console.log('[SurfEngine] Initialized');
  }

  update(_delta: number): void {}

  getState(): SurfState {
    return { ...this.state };
  }

  setState(state: SurfState): void {
    this.state = { ...state };
  }

  startRide(_waveId: string): SurfRide {
    // TODO: Implementar
    return {} as SurfRide;
  }

  addMove(_rideId: string, _move: string): void {}

  endRide(_rideId: string): SurfRide {
    return {} as SurfRide;
  }

  calculateScore(_ride: SurfRide): number {
    return 0;
  }

  getSkillLevel(): SurfDifficulty {
    return this.state.skillLevel;
  }

  addExperience(_amount: number): void {}

  destroy(): void {
    console.log('[SurfEngine] Destroyed');
  }

  private createDefaultState(): SurfState {
    return {
      isSurfing: false,
      currentRide: null,
      skillLevel: 'beginner',
      experience: 0,
    };
  }
}
