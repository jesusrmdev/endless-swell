/**
 * InventoryEngine - Motor de inventario
 */

import type { IInventoryEngine } from './interfaces';
import type { InventoryItem, InventorySlot, InventoryState } from './types';

export class InventoryEngine implements IInventoryEngine {
  private state: InventoryState;

  constructor() {
    this.state = this.createDefaultState();
  }

  initialize(): void {
    console.log('[InventoryEngine] Initialized');
  }

  update(_delta: number): void {}

  getState(): InventoryState {
    return { ...this.state };
  }

  setState(state: InventoryState): void {
    this.state = { ...state };
  }

  addItem(_item: InventoryItem, _quantity?: number): boolean {
    return false;
  }

  removeItem(_itemId: string, _quantity?: number): boolean {
    return false;
  }

  hasItem(_itemId: string): boolean {
    return false;
  }

  getItemCount(_itemId: string): number {
    return 0;
  }

  getItems(): InventoryItem[] {
    return [];
  }

  getSlots(): InventorySlot[] {
    return this.state.slots;
  }

  equipSurfboard(_itemId: string): void {}

  equipWetsuit(_itemId: string): void {}

  getEquippedSurfboard(): string | null {
    return this.state.equippedSurfboard;
  }

  getEquippedWetsuit(): string | null {
    return this.state.equippedWetsuit;
  }

  isFull(): boolean {
    return this.state.slots.length >= this.state.maxSlots;
  }

  clear(): void {
    this.state.slots = [];
  }

  destroy(): void {
    console.log('[InventoryEngine] Destroyed');
  }

  private createDefaultState(): InventoryState {
    return {
      slots: [],
      maxSlots: 20,
      equippedSurfboard: null,
      equippedWetsuit: null,
    };
  }
}
