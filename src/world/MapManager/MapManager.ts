/**
 * MapManager - Implementación pura
 *
 * Gestiona regiones y mapas sin dependencias de Phaser.
 * Lógica pura para registro, carga y transiciones.
 */

import type { IMapManager } from './interfaces';
import type { MapConfig, RegionConfig, MapManagerState } from '../types';

export class MapManager implements IMapManager {
  private state: MapManagerState = {
    currentMapId: null,
    currentRegionId: null,
    registeredMaps: new Map(),
    registeredRegions: new Map(),
  };

  initialize(): void {
    this.state = {
      currentMapId: null,
      currentRegionId: null,
      registeredMaps: new Map(),
      registeredRegions: new Map(),
    };
    console.log('[MapManager] Initialized');
  }

  registerRegion(region: RegionConfig): void {
    this.state.registeredRegions.set(region.id, region);
    console.log(`[MapManager] Region registered: ${region.name}`);
  }

  registerMap(map: MapConfig): void {
    this.state.registeredMaps.set(map.id, map);
    console.log(`[MapManager] Map registered: ${map.name}`);
  }

  loadMap(mapId: string): boolean {
    const map = this.state.registeredMaps.get(mapId);
    if (!map) {
      console.error(`[MapManager] Map not found: ${mapId}`);
      return false;
    }

    this.state.currentMapId = mapId;

    for (const region of this.state.registeredRegions.values()) {
      if (region.maps.includes(mapId)) {
        this.state.currentRegionId = region.id;
        break;
      }
    }

    console.log(`[MapManager] Map loaded: ${map.name}`);
    return true;
  }

  getCurrentMap(): MapConfig | null {
    if (!this.state.currentMapId) return null;
    return this.state.registeredMaps.get(this.state.currentMapId) || null;
  }

  getCurrentRegion(): RegionConfig | null {
    if (!this.state.currentRegionId) return null;
    return this.state.registeredRegions.get(this.state.currentRegionId) || null;
  }

  getMapById(mapId: string): MapConfig | null {
    return this.state.registeredMaps.get(mapId) || null;
  }

  getRegionById(regionId: string): RegionConfig | null {
    return this.state.registeredRegions.get(regionId) || null;
  }

  getMapsByRegion(regionId: string): MapConfig[] {
    const region = this.state.registeredRegions.get(regionId);
    if (!region) return [];

    return region.maps
      .map((mapId) => this.state.registeredMaps.get(mapId))
      .filter((map): map is MapConfig => map !== undefined);
  }

  getState(): MapManagerState {
    return {
      currentMapId: this.state.currentMapId,
      currentRegionId: this.state.currentRegionId,
      registeredMaps: new Map(this.state.registeredMaps),
      registeredRegions: new Map(this.state.registeredRegions),
    };
  }

  reset(): void {
    this.state.currentMapId = null;
    this.state.currentRegionId = null;
    console.log('[MapManager] Reset');
  }

  destroy(): void {
    this.reset();
    this.state.registeredMaps.clear();
    this.state.registeredRegions.clear();
    console.log('[MapManager] Destroyed');
  }
}
