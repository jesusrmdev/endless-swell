/**
 * ReputationEngine - Interfaces del motor de reputación
 */

import type { ReputationState, ReputationLevel, Faction } from './types';

export interface IReputationEngine {
  initialize(): void;
  update(delta: number): void;
  getState(): ReputationState;
  setState(state: ReputationState): void;
  getReputation(faction: Faction): ReputationLevel;
  addReputation(faction: Faction, amount: number): void;
  removeReputation(faction: Faction, amount: number): void;
  getLevel(faction: Faction): number;
  getTitle(faction: Faction): string;
  getTotalReputation(): number;
  destroy(): void;
}
