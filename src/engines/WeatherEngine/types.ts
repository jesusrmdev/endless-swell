/**
 * WeatherEngine - Tipos del motor de meteorología
 *
 * Define los tipos de datos utilizados por el motor de meteorología.
 */

/**
 * Tipo de nube
 */
export type CloudType = 'clear' | 'few' | 'scattered' | 'broken' | 'overcast';

/**
 * Tipo de precipitación
 */
export type PrecipitationType = 'none' | 'rain' | 'drizzle' | 'storm' | 'fog';

/**
 * Intensidad de la precipitación
 */
export type PrecipitationIntensity = 'light' | 'moderate' | 'heavy';

/**
 * Condición del cielo
 */
export type SkyCondition = 'sunny' | 'partly_cloudy' | 'cloudy' | 'overcast' | 'stormy';

/**
 * Estado del clima
 */
export interface WeatherState {
  /** Condición del cielo */
  sky: SkyCondition;
  /** Tipo de nubes */
  clouds: CloudType;
  /** Nubosidad (0-100) */
  cloudCover: number;
  /** Temperatura en grados centígrados */
  temperature: number;
  /** Temperatura percibida */
  feelsLike: number;
  /** Humedad relativa (0-100) */
  humidity: number;
  /** Precipitación actual */
  precipitation: PrecipitationType;
  /** Intensidad de la precipitación */
  precipitationIntensity: PrecipitationIntensity;
  /** Visibilidad en kilómetros */
  visibility: number;
  /** Presión atmosférica en hPa */
  pressure: number;
  /** Índice UV (0-11) */
  uvIndex: number;
}

/**
 * Datos de clima para una región
 */
export interface RegionWeatherData {
  /** ID de la región */
  regionId: string;
  /** Temperatura mínima promedio */
  minTemp: number;
  /** Temperatura máxima promedio */
  maxTemp: number;
  /** Probabilidad de lluvia (0-100) */
  rainChance: number;
  /** Velocidad promedio del viento */
  avgWindSpeed: number;
  /** Horas de sol promedio */
  sunHours: number;
}
