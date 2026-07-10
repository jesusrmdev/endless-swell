/**
 * OceanEngine - Tipos del motor de océano
 *
 * Define los tipos de datos utilizados por el motor de océano.
 */

/**
 * Dirección del swell en grados (0-360)
 */
export type SwellDirection = number;

/**
 * Altura de las olas en metros
 */
export type WaveHeight = number;

/**
 * Período de las olas en segundos
 */
export type WavePeriod = number;

/**
 * Velocidad del viento en km/h
 */
export type WindSpeed = number;

/**
 * Dirección del viento en grados (0-360)
 */
export type WindDirection = number;

/**
 * Tipo de fondo marino
 */
export type SeabedType = 'sand' | 'rock' | 'reef' | 'mud' | 'mixed';

/**
 * Nivel de marea
 */
export type TideLevel = 'low' | 'mid' | 'high';

/**
 * Condición general del mar
 */
export type SeaCondition = 'calm' | 'moderate' | 'rough' | 'stormy';

/**
 * Datos de una ola individual
 */
export interface Wave {
  /** Identificador único de la ola */
  id: string;
  /** Altura de la ola en metros */
  height: WaveHeight;
  /** Período de la ola en segundos */
  period: WavePeriod;
  /** Dirección de la ola en grados */
  direction: SwellDirection;
  /** Posición x de la ola */
  x: number;
  /** Posición y de la ola */
  y: number;
  /** Velocidad de la ola */
  speed: number;
}

/**
 * Estado del swell
 */
export interface SwellState {
  /** Dirección del swell */
  direction: SwellDirection;
  /** Altura significativa del swell */
  height: WaveHeight;
  /** Período promedio del swell */
  period: WavePeriod;
  /** Número de groupos de olas */
  groups: number;
}

/**
 * Estado del viento
 */
export interface WindState {
  /** Dirección del viento */
  direction: WindDirection;
  /** Velocidad del viento */
  speed: WindSpeed;
  /** Velocidad de las ráfagas */
  gustSpeed: WindSpeed;
}

/**
 * Estado completo del océano
 */
export interface OceanState {
  /** Estado del swell */
  swell: SwellState;
  /** Estado del viento */
  wind: WindState;
  /** Nivel de la marea */
  tide: TideLevel;
  /** Condición general del mar */
  condition: SeaCondition;
  /** Temperatura del agua en grados centígrados */
  waterTemperature: number;
  /** Tipo de fondo marino */
  seabed: SeabedType;
}

/**
 * Datos de una playa para el océano
 */
export interface BeachOceanData {
  /** ID de la playa */
  beachId: string;
  /** Dirección óptima del swell */
  optimalSwellDirection: SwellDirection;
  /** Rango aceptable de swell */
  swellDirectionRange: number;
  /** Altura mínima del swell */
  minSwellHeight: WaveHeight;
  /** Altura máxima del swell */
  maxSwellHeight: WaveHeight;
  /** Dirección óptima del viento */
  optimalWindDirection: WindDirection;
  /** Rango aceptable de viento */
  windDirectionRange: number;
  /** Velocidad máxima del viento */
  maxWindSpeed: WindSpeed;
  /** Marea ideal */
  idealTide: TideLevel;
  /** Tipo de fondo */
  seabed: SeabedType;
  /** Nivel recomendado (1-10) */
  recommendedLevel: number;
  /** Riesgos asociados */
  risks: string[];
}
