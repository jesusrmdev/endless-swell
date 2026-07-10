/**
 * ReputationEngine - Tipos del motor de reputación
 */

export type Faction = 'locals' | 'surfers' | 'merchants' | 'athletes' | 'travelers';

export interface ReputationLevel {
  faction: Faction;
  level: number;
  experience: number;
  title: string;
}

export interface ReputationState {
  reputations: ReputationLevel[];
  totalReputation: number;
}
