/**
 * QuestEngine - Interfaces del motor de misiones
 */

import type { Quest, QuestState } from './types';

export interface IQuestEngine {
  initialize(): void;
  update(delta: number): void;
  getState(): QuestState;
  setState(state: QuestState): void;
  acceptQuest(questId: string): void;
  abandonQuest(questId: string): void;
  completeQuest(questId: string): void;
  failQuest(questId: string): void;
  updateObjective(questId: string, objectiveId: string, progress: number): void;
  getActiveQuests(): Quest[];
  getQuest(questId: string): Quest | null;
  isQuestComplete(questId: string): boolean;
  checkPrerequisites(quest: Quest): boolean;
  destroy(): void;
}
