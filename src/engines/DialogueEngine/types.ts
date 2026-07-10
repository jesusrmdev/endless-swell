/**
 * DialogueEngine - Tipos del motor de diálogos
 */

export type DialogueNodeType = 'text' | 'choice' | 'condition' | 'action';

export interface DialogueNode {
  id: string;
  type: DialogueNodeType;
  text?: string;
  speaker?: string;
  choices?: DialogueChoice[];
  conditions?: DialogueCondition[];
  actions?: DialogueAction[];
  nextNodeId?: string;
}

export interface DialogueChoice {
  text: string;
  nextNodeId: string;
  conditions?: DialogueCondition[];
}

export interface DialogueCondition {
  type: 'has_item' | 'has_money' | 'quest_complete' | 'reputation';
  value: string | number;
  operator: 'eq' | 'gt' | 'lt' | 'gte' | 'lte';
}

export interface DialogueAction {
  type: 'give_item' | 'take_item' | 'give_money' | 'take_money' | 'start_quest' | 'complete_quest';
  value: string | number;
}

export interface Dialogue {
  id: string;
  nodes: DialogueNode[];
  startNodeId: string;
}

export interface DialogueState {
  currentDialogue: Dialogue | null;
  currentNodeId: string | null;
  isActive: boolean;
  history: string[];
}
