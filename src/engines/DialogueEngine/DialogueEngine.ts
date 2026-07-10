/**
 * DialogueEngine - Motor de diálogos
 */

import type { IDialogueEngine } from './interfaces';
import type { Dialogue, DialogueState, DialogueNode } from './types';

export class DialogueEngine implements IDialogueEngine {
  private state: DialogueState;

  constructor() {
    this.state = this.createDefaultState();
  }

  initialize(): void {
    console.log('[DialogueEngine] Initialized');
  }

  update(_delta: number): void {}

  getState(): DialogueState {
    return { ...this.state };
  }

  setState(state: DialogueState): void {
    this.state = { ...state };
  }

  startDialogue(_dialogue: Dialogue): void {}

  selectChoice(_choiceIndex: number): void {}

  advanceDialogue(): void {}

  getCurrentNode(): DialogueNode | null {
    return null;
  }

  endDialogue(): void {
    this.state.isActive = false;
    this.state.currentDialogue = null;
    this.state.currentNodeId = null;
  }

  isActive(): boolean {
    return this.state.isActive;
  }

  destroy(): void {
    console.log('[DialogueEngine] Destroyed');
  }

  private createDefaultState(): DialogueState {
    return {
      currentDialogue: null,
      currentNodeId: null,
      isActive: false,
      history: [],
    };
  }
}
