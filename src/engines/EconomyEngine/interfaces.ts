/**
 * EconomyEngine - Interfaces del motor de economía
 */

import type { EconomyState, Price, Transaction, Shop } from './types';

export interface IEconomyEngine {
  initialize(): void;
  update(delta: number): void;
  getState(): EconomyState;
  setState(state: EconomyState): void;
  getMoney(): number;
  addMoney(amount: number): void;
  spendMoney(amount: number): boolean;
  canAfford(amount: number): boolean;
  purchase(itemId: string, price: Price, quantity?: number): Transaction;
  sell(itemId: string, price: Price, quantity?: number): Transaction;
  getTransactions(): Transaction[];
  getShop(shopId: string): Shop | null;
  destroy(): void;
}
