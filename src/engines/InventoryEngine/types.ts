/**
 * InventoryEngine - Tipos del motor de inventario
 */

export type ItemType = 'surfboard' | 'wetsuit' | 'accessory' | 'consumable' | 'quest';

export type ItemRarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';

export interface InventoryItem {
  id: string;
  name: string;
  type: ItemType;
  rarity: ItemRarity;
  description: string;
  icon: string;
  stackable: boolean;
  maxStack: number;
  currentStack: number;
  stats?: Record<string, number>;
}

export interface InventorySlot {
  index: number;
  item: InventoryItem | null;
  quantity: number;
}

export interface InventoryState {
  slots: InventorySlot[];
  maxSlots: number;
  equippedSurfboard: string | null;
  equippedWetsuit: string | null;
}
