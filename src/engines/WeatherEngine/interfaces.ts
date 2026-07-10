/**
 * WeatherEngine - Interfaces del motor de meteorología
 *
 * Define los contratos que expone el motor de meteorología.
 */

import type { WeatherState, RegionWeatherData } from './types';

/**
 * Interfaz principal del WeatherEngine
 *
 * Responsabilidades:
 * - Calcular el estado del clima
 * - Gestionar transiciones de clima
 * - Predecir cambios de clima
 */
export interface IWeatherEngine {
  /**
   * Inicializa el motor de meteorología
   */
  initialize(): void;

  /**
   * Actualiza el estado del clima
   * @param delta - Tiempo desde la última actualización en ms
   */
  update(delta: number): void;

  /**
   * Obtiene el estado actual del clima
   * @returns Estado del clima
   */
  getState(): WeatherState;

  /**
   * Establece el estado del clima
   * @param state - Nuevo estado del clima
   */
  setState(state: WeatherState): void;

  /**
   * Calcula el clima para una región
   * @param regionData - Datos de la región
   * @returns Estado del clima para esa región
   */
  calculateRegionWeather(regionData: RegionWeatherData): WeatherState;

  /**
   * Obtiene la temperatura actual
   * @returns Temperatura en grados centígrados
   */
  getTemperature(): number;

  /**
   * Obtiene la condición del cielo
   * @returns Condición del cielo
   */
  getSkyCondition(): WeatherState['sky'];

  /**
   * Verifica si está lloviendo
   * @returns true si está lloviendo
   */
  isRaining(): boolean;

  /**
   * Obtiene la probabilidad de lluvia
   * @returns Probabilidad (0-100)
   */
  getRainChance(): number;

  /**
   * Limpia recursos del motor
   */
  destroy(): void;
}
