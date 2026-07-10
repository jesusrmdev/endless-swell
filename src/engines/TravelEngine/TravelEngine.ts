/**
 * TravelEngine - Motor de viajes
 */

import type { ITravelEngine } from './interfaces';
import type { TravelState, Region, TravelRoute, TravelMethod } from './types';

export class TravelEngine implements ITravelEngine {
  private state: TravelState;

  constructor() {
    this.state = this.createDefaultState();
  }

  initialize(): void {
    console.log('[TravelEngine] Initialized');
  }

  update(_delta: number): void {}

  getState(): TravelState {
    return { ...this.state };
  }

  setState(state: TravelState): void {
    this.state = { ...state };
  }

  getCurrentRegion(): Region | null {
    return null;
  }

  getRegion(_regionId: string): Region | null {
    return null;
  }

  travelTo(_regionId: string, _method: TravelMethod): void {}

  getRoute(_from: string, _to: string, _method: TravelMethod): TravelRoute | null {
    return null;
  }

  getAvailableRegions(): Region[] {
    return [];
  }

  isRegionUnlocked(_regionId: string): boolean {
    return false;
  }

  unlockRegion(_regionId: string): void {}

  getVisitedRegions(): string[] {
    return [];
  }

  destroy(): void {
    console.log('[TravelEngine] Destroyed');
  }

  private createDefaultState(): TravelState {
    return {
      currentRegion: 'galicia',
      visitedRegions: ['galicia'],
      unlockedRegions: ['galicia'],
      isTraveling: false,
      currentRoute: null,
    };
  }
}
