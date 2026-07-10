/**
 * JournalEngine - Motor de diario
 */

import type { IJournalEngine } from './interfaces';
import type { JournalState, JournalEntry, JournalEntryType } from './types';

export class JournalEngine implements IJournalEngine {
  private state: JournalState;

  constructor() {
    this.state = this.createDefaultState();
  }

  initialize(): void {
    console.log('[JournalEngine] Initialized');
  }

  update(_delta: number): void {}

  getState(): JournalState {
    return { ...this.state };
  }

  setState(state: JournalState): void {
    this.state = { ...state };
  }

  addEntry(_entry: Omit<JournalEntry, 'id' | 'timestamp'>): JournalEntry {
    return {} as JournalEntry;
  }

  removeEntry(_entryId: string): void {}

  getEntries(_type?: JournalEntryType): JournalEntry[] {
    return [];
  }

  getEntry(_entryId: string): JournalEntry | null {
    return null;
  }

  searchEntries(_query: string): JournalEntry[] {
    return [];
  }

  openJournal(): void {
    this.state.isOpen = true;
  }

  closeJournal(): void {
    this.state.isOpen = false;
  }

  isOpen(): boolean {
    return this.state.isOpen;
  }

  destroy(): void {
    console.log('[JournalEngine] Destroyed');
  }

  private createDefaultState(): JournalState {
    return {
      entries: [],
      currentEntry: null,
      isOpen: false,
    };
  }
}
