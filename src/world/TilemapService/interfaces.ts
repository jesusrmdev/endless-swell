/**
 * TilemapService - Interfaces
 */

import type { MapObject } from '../types';

/**
 * Interfaz del servicio de tilemap
 *
 * Responsabilidades:
 * - Cargar tilemaps de Tiled
 * - Gestionar capas y tilesets
 * - Configurar colisiones por capa
 * - Extraer objetos de capas de objetos
 *
 * Esta interfaz NO depende de Phaser.
 * La implementación concreta sí usa Phaser.
 */
export interface ITilemapService {
  /**
   * Inicializa el servicio con una escena de Phaser
   * @param scene - Escena de Phaser
   */
  initialize(scene: Phaser.Scene): void;

  /**
   * Carga un mapa desde un tilemap JSON
   * @param tilemapKey - Key del tilemap en el cache de Phaser
   * @param tilesetConfigs - Configuraciones de los tilesets
   */
  loadMap(
    tilemapKey: string,
    tilesetConfigs: Array<{ tiledName: string; imageKey: string }>,
  ): void;

  /**
   * Crea una capa de tilemap
   * @param layerName - Nombre de la capa en Tiled
   * @param tilesetKeys - Keys de los tilesets para esta capa
   * @param depth - Profundidad de renderizado
   */
  createTilemapLayer(
    layerName: string,
    tilesetKeys: string[],
    depth: number,
  ): void;

  /**
   * Habilita colisiones en una capa por índice de tiles
   * @param layerName - Nombre de la capa
   * @param tileIndices - Índices de tiles colisionables
   */
  setCollisionByIndices(layerName: string, tileIndices: number[]): void;

  /**
   * Habilita colisiones en una capa excluyendo ciertos índices
   * @param layerName - Nombre de la capa
   * @param excludedIndices - Índices a excluir (el resto serán colisionables)
   */
  setCollisionByExclusion(layerName: string, excludedIndices: number[]): void;

  /**
   * Obtiene objetos de una capa de objetos
   * @param layerName - Nombre de la capa de objetos
   * @returns Array de objetos
   */
  getObjectsFromLayer(layerName: string): MapObject[];

  /**
   * Obtiene un objeto por nombre de una capa
   * @param layerName - Nombre de la capa de objetos
   * @param objectName - Nombre del objeto
   * @returns Objeto encontrado o null
   */
  getObjectByName(layerName: string, objectName: string): MapObject | null;

  /**
   * Obtiene la capa de tilemap creada
   * @param layerName - Nombre de la capa
   * @returns Capa de Phaser o null
   */
  getPhaserLayer(layerName: string): Phaser.Tilemaps.TilemapLayer | null;

  /**
   * Obtiene el tilemap de Phaser
   * @returns Tilemap o null
   */
  getPhaserMap(): Phaser.Tilemaps.Tilemap | null;

  /**
   * Limpia el mapa actual
   */
  clearMap(): void;

  /**
   * Destruye el servicio y libera recursos
   */
  destroy(): void;
}
