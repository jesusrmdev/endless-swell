/**
 * JournalEngine - Interfaces del motor de diario
 */

import type { JournalState, JournalEntry, JournalEntryType } from './types';

export interface IJournalEngine {
  initialize(): void;
  update(delta: number): void;
  getState(): JournalState;
  setState(state: JournalState): void;
  addEntry(entry: Omit<JournalEntry, 'id' | 'timestamp'>): JournalEntry;
  removeEntry(entryId: string): void;
  getEntries(type?: JournalEntryType): JournalEntry[];
  getEntry(entryId: string): JournalEntry | null;
  searchEntries(query: string): JournalEntry[];
  openJournal(): void;
  closeJournal(): void;
  isOpen(): boolean;
  destroy(): void;
}
