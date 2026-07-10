/**
 * SurfEngine - Tipos del motor de surf
 */

export type SurfMove = 'paddle' | 'pop_up' | 'bottom_turn' | 'cutback' | 'tube' | 'air' | 'floater';

export type SurfDifficulty = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export interface SurfMoveData {
  id: string;
  name: string;
  difficulty: SurfDifficulty;
  basePoints: number;
  riskFactor: number;
}

export interface SurfRide {
  id: string;
  waveId: string;
  moves: SurfMove[];
  totalScore: number;
  duration: number;
}

export interface SurfState {
  isSurfing: boolean;
  currentRide: SurfRide | null;
  skillLevel: SurfDifficulty;
  experience: number;
}
