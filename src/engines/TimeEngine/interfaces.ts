/**
 * TimeEngine - Interfaces del motor de tiempo
 */

import type { GameTime, TimeState, Season, DayPeriod } from './types';

export interface ITimeEngine {
  initialize(): void;
  update(delta: number): void;
  getState(): TimeState;
  setState(state: TimeState): void;
  getCurrentTime(): GameTime;
  getDayPeriod(): DayPeriod;
  getSeason(): Season;
  setTimeScale(scale: number): void;
  getTimeScale(): number;
  pause(): void;
  resume(): void;
  isPaused(): boolean;
  addTime(hours: number, minutes?: number): void;
  destroy(): void;
}
