/**
 * MapManager - Interfaces
 */

import type { MapConfig, RegionConfig, MapManagerState } from '../types';

/**
 * Interfaz del gestor de mapas
 *
 * Responsabilidades:
 * - Gestionar regiones y mapas registrados
 * - Cargar configuraciones de mapa
 * - Gestionar transiciones entre mapas
 * - Mantener estado del mapa actual
 *
 * Esta interfaz NO depende de Phaser.
 */
export interface IMapManager {
  /**
   * Inicializa el gestor
   */
  initialize(): void;

  /**
   * Registra una región con sus mapas
   * @param region - Configuración de la región
   */
  registerRegion(region: RegionConfig): void;

  /**
   * Registra un mapa
   * @param map - Configuración del mapa
   */
  registerMap(map: MapConfig): void;

  /**
   * Carga un mapa como actual
   * @param mapId - ID del mapa a cargar
   * @returns true si se cargó correctamente
   */
  loadMap(mapId: string): boolean;

  /**
   * Obtiene el mapa actual
   * @returns Configuración del mapa actual o null
   */
  getCurrentMap(): MapConfig | null;

  /**
   * Obtiene la región actual
   * @returns Configuración de la región actual o null
   */
  getCurrentRegion(): RegionConfig | null;

  /**
   * Obtiene un mapa por ID
   * @param mapId - ID del mapa
   * @returns Configuración del mapa o null
   */
  getMapById(mapId: string): MapConfig | null;

  /**
   * Obtiene una región por ID
   * @param regionId - ID de la región
   * @returns Configuración de la región o null
   */
  getRegionById(regionId: string): RegionConfig | null;

  /**
   * Obtiene todos los mapas de una región
   * @param regionId - ID de la región
   * @returns Array de configuraciones de mapas
   */
  getMapsByRegion(regionId: string): MapConfig[];

  /**
   * Obtiene el estado actual del gestor
   * @returns Estado del MapManager
   */
  getState(): MapManagerState;

  /**
   * Limpia el estado
   */
  reset(): void;

  /**
   * Destruye el gestor
   */
  destroy(): void;
}
