/**
 * InventoryEngine - Interfaces del motor de inventario
 */

import type { InventoryItem, InventorySlot, InventoryState } from './types';

export interface IInventoryEngine {
  initialize(): void;
  update(delta: number): void;
  getState(): InventoryState;
  setState(state: InventoryState): void;
  addItem(item: InventoryItem, quantity?: number): boolean;
  removeItem(itemId: string, quantity?: number): boolean;
  hasItem(itemId: string): boolean;
  getItemCount(itemId: string): number;
  getItems(): InventoryItem[];
  getSlots(): InventorySlot[];
  equipSurfboard(itemId: string): void;
  equipWetsuit(itemId: string): void;
  getEquippedSurfboard(): string | null;
  getEquippedWetsuit(): string | null;
  isFull(): boolean;
  clear(): void;
  destroy(): void;
}
