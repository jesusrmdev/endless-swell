/**
 * TimeEngine - Motor de tiempo
 */

import type { ITimeEngine } from './interfaces';
import type { GameTime, TimeState, Season, DayPeriod } from './types';

export class TimeEngine implements ITimeEngine {
  private state: TimeState;

  constructor() {
    this.state = this.createDefaultState();
  }

  initialize(): void {
    console.log('[TimeEngine] Initialized');
  }

  update(_delta: number): void {}

  getState(): TimeState {
    return { ...this.state };
  }

  setState(state: TimeState): void {
    this.state = { ...state };
  }

  getCurrentTime(): GameTime {
    return { ...this.state.currentTime };
  }

  getDayPeriod(): DayPeriod {
    return 'morning';
  }

  getSeason(): Season {
    return this.state.currentTime.season;
  }

  setTimeScale(_scale: number): void {}

  getTimeScale(): number {
    return this.state.timeScale;
  }

  pause(): void {
    this.state.isPaused = true;
  }

  resume(): void {
    this.state.isPaused = false;
  }

  isPaused(): boolean {
    return this.state.isPaused;
  }

  addTime(_hours: number, _minutes?: number): void {}

  destroy(): void {
    console.log('[TimeEngine] Destroyed');
  }

  private createDefaultState(): TimeState {
    return {
      currentTime: {
        day: 1,
        hour: 8,
        minute: 0,
        season: 'summer',
        year: 2024,
      },
      timeScale: 1,
      isPaused: false,
      dayLength: 24,
    };
  }
}
