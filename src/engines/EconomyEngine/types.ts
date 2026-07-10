/**
 * EconomyEngine - Tipos del motor de economía
 */

export type Currency = 'EUR';

export interface Price {
  amount: number;
  currency: Currency;
}

export interface Transaction {
  id: string;
  type: 'purchase' | 'sale' | 'reward' | 'expense';
  itemId: string;
  quantity: number;
  price: Price;
  timestamp: number;
}

export interface Shop {
  id: string;
  name: string;
  type: 'surfshop' | 'restaurant' | 'hotel' | 'gas_station';
  inventory: string[];
  markup: number;
}

export interface EconomyState {
  money: number;
  transactions: Transaction[];
  totalEarned: number;
  totalSpent: number;
}
