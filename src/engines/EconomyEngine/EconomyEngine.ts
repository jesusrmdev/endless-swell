/**
 * EconomyEngine - Motor de economía
 */

import type { IEconomyEngine } from './interfaces';
import type { EconomyState, Price, Transaction, Shop } from './types';

export class EconomyEngine implements IEconomyEngine {
  private state: EconomyState;

  constructor() {
    this.state = this.createDefaultState();
  }

  initialize(): void {
    console.log('[EconomyEngine] Initialized');
  }

  update(_delta: number): void {}

  getState(): EconomyState {
    return { ...this.state };
  }

  setState(state: EconomyState): void {
    this.state = { ...state };
  }

  getMoney(): number {
    return this.state.money;
  }

  addMoney(_amount: number): void {}

  spendMoney(_amount: number): boolean {
    return false;
  }

  canAfford(_amount: number): boolean {
    return false;
  }

  purchase(_itemId: string, _price: Price, _quantity?: number): Transaction {
    return {} as Transaction;
  }

  sell(_itemId: string, _price: Price, _quantity?: number): Transaction {
    return {} as Transaction;
  }

  getTransactions(): Transaction[] {
    return [];
  }

  getShop(_shopId: string): Shop | null {
    return null;
  }

  destroy(): void {
    console.log('[EconomyEngine] Destroyed');
  }

  private createDefaultState(): EconomyState {
    return {
      money: 500,
      transactions: [],
      totalEarned: 0,
      totalSpent: 0,
    };
  }
}
