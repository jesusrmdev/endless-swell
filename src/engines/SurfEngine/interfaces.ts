/**
 * SurfEngine - Interfaces del motor de surf
 */

import type { SurfState, SurfRide, SurfDifficulty } from './types';

export interface ISurfEngine {
  initialize(): void;
  update(delta: number): void;
  getState(): SurfState;
  setState(state: SurfState): void;
  startRide(waveId: string): SurfRide;
  addMove(rideId: string, move: string): void;
  endRide(rideId: string): SurfRide;
  calculateScore(ride: SurfRide): number;
  getSkillLevel(): SurfDifficulty;
  addExperience(amount: number): void;
  destroy(): void;
}
