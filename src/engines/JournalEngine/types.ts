/**
 * JournalEngine - Tipos del motor de diario
 */

export type JournalEntryType = 'surf' | 'travel' | 'discovery' | 'quest' | 'note';

export interface JournalEntry {
  id: string;
  type: JournalEntryType;
  title: string;
  content: string;
  timestamp: number;
  location: string;
  tags: string[];
  photo?: string;
}

export interface JournalState {
  entries: JournalEntry[];
  currentEntry: JournalEntry | null;
  isOpen: boolean;
}
