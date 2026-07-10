/**
 * DialogueEngine - Interfaces del motor de diálogos
 */

import type { Dialogue, DialogueState, DialogueNode } from './types';

export interface IDialogueEngine {
  initialize(): void;
  update(delta: number): void;
  getState(): DialogueState;
  setState(state: DialogueState): void;
  startDialogue(dialogue: Dialogue): void;
  selectChoice(choiceIndex: number): void;
  advanceDialogue(): void;
  getCurrentNode(): DialogueNode | null;
  endDialogue(): void;
  isActive(): boolean;
  destroy(): void;
}
