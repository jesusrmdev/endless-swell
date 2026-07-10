/**
 * QuestEngine - Motor de misiones
 */

import type { IQuestEngine } from './interfaces';
import type { Quest, QuestState } from './types';

export class QuestEngine implements IQuestEngine {
  private state: QuestState;

  constructor() {
    this.state = this.createDefaultState();
  }

  initialize(): void {
    console.log('[QuestEngine] Initialized');
  }

  update(_delta: number): void {}

  getState(): QuestState {
    return { ...this.state };
  }

  setState(state: QuestState): void {
    this.state = { ...state };
  }

  acceptQuest(_questId: string): void {}

  abandonQuest(_questId: string): void {}

  completeQuest(_questId: string): void {}

  failQuest(_questId: string): void {}

  updateObjective(_questId: string, _objectiveId: string, _progress: number): void {}

  getActiveQuests(): Quest[] {
    return [];
  }

  getQuest(_questId: string): Quest | null {
    return null;
  }

  isQuestComplete(_questId: string): boolean {
    return false;
  }

  checkPrerequisites(_quest: Quest): boolean {
    return true;
  }

  destroy(): void {
    console.log('[QuestEngine] Destroyed');
  }

  private createDefaultState(): QuestState {
    return {
      activeQuests: [],
      completedQuests: [],
      failedQuests: [],
      availableQuests: [],
    };
  }
}
