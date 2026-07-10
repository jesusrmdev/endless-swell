/**
 * TravelEngine - Tipos del motor de viajes
 */

export type TravelMethod = 'walk' | 'drive' | 'bus' | 'train';

export interface Region {
  id: string;
  name: string;
  description: string;
  unlockLevel: number;
  connections: string[];
  position: { x: number; y: number };
}

export interface TravelRoute {
  from: string;
  to: string;
  distance: number;
  method: TravelMethod;
  duration: number;
  fuelCost: number;
  moneyCost: number;
}

export interface TravelState {
  currentRegion: string;
  visitedRegions: string[];
  unlockedRegions: string[];
  isTraveling: boolean;
  currentRoute: TravelRoute | null;
}
