/**
 * TilemapService - Implementación con Phaser
 *
 * Wrapper de Phaser para gestionar tilemaps de Tiled.
 * Único componente del sistema de mapas que depende de Phaser.
 */

import type { ITilemapService } from './interfaces';
import type { MapObject } from '../types';

export class TilemapService implements ITilemapService {
  private scene: Phaser.Scene | null = null;
  private currentMap: Phaser.Tilemaps.Tilemap | null = null;
  private layers: Map<string, Phaser.Tilemaps.TilemapLayer> = new Map();
  private tilesets: Map<string, Phaser.Tilemaps.Tileset> = new Map();

  initialize(scene: Phaser.Scene): void {
    this.scene = scene;
    console.log('[TilemapService] Initialized');
  }

  loadMap(
    tilemapKey: string,
    tilesetConfigs: Array<{ tiledName: string; imageKey: string }>,
  ): void {
    if (!this.scene) {
      console.error('[TilemapService] Scene not initialized');
      return;
    }

    this.clearMap();

    this.currentMap = this.scene.make.tilemap({ key: tilemapKey });

    for (const config of tilesetConfigs) {
      const tileset = this.currentMap.addTilesetImage(
        config.tiledName,
        config.imageKey,
      );
      if (tileset) {
        this.tilesets.set(config.tiledName, tileset);
      }
    }

    console.log(`[TilemapService] Map loaded: ${tilemapKey}`);
  }

  createTilemapLayer(
    layerName: string,
    tilesetKeys: string[],
    depth: number,
  ): void {
    if (!this.currentMap) {
      console.error('[TilemapService] No map loaded');
      return;
    }

    const tilesets = tilesetKeys
      .map((key) => this.tilesets.get(key))
      .filter((t): t is Phaser.Tilemaps.Tileset => t !== undefined);

    if (tilesets.length === 0) {
      console.error(`[TilemapService] No tilesets found for layer: ${layerName}`);
      return;
    }

    const layer = this.currentMap.createLayer(layerName, tilesets);
    if (layer) {
      layer.setDepth(depth);
      this.layers.set(layerName, layer);
    }
  }

  setCollisionByIndices(layerName: string, tileIndices: number[]): void {
    const layer = this.layers.get(layerName);
    if (layer) {
      layer.setCollision(tileIndices);
    }
  }

  setCollisionByExclusion(layerName: string, excludedIndices: number[]): void {
    const layer = this.layers.get(layerName);
    if (layer) {
      layer.setCollisionByExclusion(excludedIndices);
    }
  }

  getObjectsFromLayer(layerName: string): MapObject[] {
    if (!this.currentMap) return [];

    const objectLayer = this.currentMap.getObjectLayer(layerName);
    if (!objectLayer) return [];

    return objectLayer.objects.map((obj) => ({
      name: obj.name || '',
      type: (obj.type || '') as MapObject['type'],
      x: obj.x ?? 0,
      y: obj.y ?? 0,
      width: obj.width,
      height: obj.height,
      properties: obj.properties as Record<string, unknown> | undefined,
    }));
  }

  getObjectByName(layerName: string, objectName: string): MapObject | null {
    const objects = this.getObjectsFromLayer(layerName);
    return objects.find((obj) => obj.name === objectName) || null;
  }

  getPhaserLayer(layerName: string): Phaser.Tilemaps.TilemapLayer | null {
    return this.layers.get(layerName) || null;
  }

  getPhaserMap(): Phaser.Tilemaps.Tilemap | null {
    return this.currentMap;
  }

  clearMap(): void {
    this.layers.clear();
    this.tilesets.clear();
    if (this.currentMap) {
      this.currentMap.destroy();
      this.currentMap = null;
    }
  }

  destroy(): void {
    this.clearMap();
    this.scene = null;
    console.log('[TilemapService] Destroyed');
  }
}
