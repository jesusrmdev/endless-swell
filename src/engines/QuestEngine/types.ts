/**
 * QuestEngine - Tipos del motor de misiones
 */

export type QuestStatus = 'available' | 'active' | 'completed' | 'failed';

export type QuestType = 'main' | 'side' | 'daily' | 'hidden';

export interface QuestObjective {
  id: string;
  description: string;
  type: 'talk' | 'collect' | 'surf' | 'travel' | 'discover';
  target: string;
  current: number;
  required: number;
  completed: boolean;
}

export interface QuestReward {
  money?: number;
  experience?: number;
  items?: string[];
  reputation?: { faction: string; amount: number };
}

export interface Quest {
  id: string;
  name: string;
  description: string;
  type: QuestType;
  status: QuestStatus;
  objectives: QuestObjective[];
  rewards: QuestReward;
  prerequisites: string[];
  giverNpcId: string;
}

export interface QuestState {
  activeQuests: Quest[];
  completedQuests: string[];
  failedQuests: string[];
  availableQuests: Quest[];
}
