/**
 * ReputationEngine - Motor de reputación
 */

import type { IReputationEngine } from './interfaces';
import type { ReputationState, ReputationLevel, Faction } from './types';

export class ReputationEngine implements IReputationEngine {
  private state: ReputationState;

  constructor() {
    this.state = this.createDefaultState();
  }

  initialize(): void {
    console.log('[ReputationEngine] Initialized');
  }

  update(_delta: number): void {}

  getState(): ReputationState {
    return { ...this.state };
  }

  setState(state: ReputationState): void {
    this.state = { ...state };
  }

  getReputation(_faction: Faction): ReputationLevel {
    return {} as ReputationLevel;
  }

  addReputation(_faction: Faction, _amount: number): void {}

  removeReputation(_faction: Faction, _amount: number): void {}

  getLevel(_faction: Faction): number {
    return 1;
  }

  getTitle(_faction: Faction): string {
    return 'Desconocido';
  }

  getTotalReputation(): number {
    return this.state.totalReputation;
  }

  destroy(): void {
    console.log('[ReputationEngine] Destroyed');
  }

  private createDefaultState(): ReputationState {
    return {
      reputations: [],
      totalReputation: 0,
    };
  }
}
