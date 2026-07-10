/**
 * TimeEngine - Tipos del motor de tiempo
 */

export type Season = 'spring' | 'summer' | 'autumn' | 'winter';

export type DayPeriod = 'dawn' | 'morning' | 'noon' | 'afternoon' | 'dusk' | 'night';

export interface GameTime {
  day: number;
  hour: number;
  minute: number;
  season: Season;
  year: number;
}

export interface TimeState {
  currentTime: GameTime;
  timeScale: number;
  isPaused: boolean;
  dayLength: number;
}
