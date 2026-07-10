/**
 * TravelEngine - Interfaces del motor de viajes
 */

import type { TravelState, Region, TravelRoute, TravelMethod } from './types';

export interface ITravelEngine {
  initialize(): void;
  update(delta: number): void;
  getState(): TravelState;
  setState(state: TravelState): void;
  getCurrentRegion(): Region | null;
  getRegion(regionId: string): Region | null;
  travelTo(regionId: string, method: TravelMethod): void;
  getRoute(from: string, to: string, method: TravelMethod): TravelRoute | null;
  getAvailableRegions(): Region[];
  isRegionUnlocked(regionId: string): boolean;
  unlockRegion(regionId: string): void;
  getVisitedRegions(): string[];
  destroy(): void;
}
