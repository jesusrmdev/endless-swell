/**
 * OceanEngine - Interfaces del motor de océano
 *
 * Define los contratos que expone el motor de océano.
 */

import type { OceanState, BeachOceanData, Wave, SwellDirection, WaveHeight } from './types';

/**
 * Interfaz principal del OceanEngine
 *
 * Responsabilidades:
 * - Calcular el estado del océano
 * - Generar olas
 * - Gestionar mareas
 * - Evaluar condiciones de surf
 */
export interface IOceanEngine {
  /**
   * Inicializa el motor de océano
   */
  initialize(): void;

  /**
   * Actualiza el estado del océano
   * @param delta - Tiempo desde la última actualización en ms
   */
  update(delta: number): void;

  /**
   * Obtiene el estado actual del océano
   * @returns Estado completo del océano
   */
  getState(): OceanState;

  /**
   * Establece el estado del océano
   * @param state - Nuevo estado del océano
   */
  setState(state: OceanState): void;

  /**
   * Calcula las condiciones para una playa específica
   * @param beachData - Datos de la playa
   * @returns Estado del océano para esa playa
   */
  calculateBeachConditions(beachData: BeachOceanData): OceanState;

  /**
   * Genera una nueva ola
   * @param x - Posición x de generación
   * @param y - Posición y de generación
   * @returns La ola generada
   */
  generateWave(x: number, y: number): Wave;

  /**
   * Obtiene todas las olas activas
   * @returns Array de olas activas
   */
  getActiveWaves(): Wave[];

  /**
   * Calcula la calidad del surf en una playa
   * @param beachData - Datos de la playa
   * @returns Puntuación de calidad (0-100)
   */
  calculateSurfQuality(beachData: BeachOceanData): number;

  /**
   * Verifica si las condiciones son aptas para surf
   * @param beachData - Datos de la playa
   * @param playerLevel - Nivel del jugador (1-10)
   * @returns true si las condiciones son aptas
   */
  areConditionsSuitable(beachData: BeachOceanData, playerLevel: number): boolean;

  /**
   * Obtiene la dirección del swell actual
   * @returns Dirección del swell en grados
   */
  getSwellDirection(): SwellDirection;

  /**
   * Obtiene la altura significativa del swell
   * @returns Altura en metros
   */
  getSwellHeight(): WaveHeight;

  /**
   * Limpia recursos del motor
   */
  destroy(): void;
}
