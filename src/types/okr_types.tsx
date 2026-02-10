export type KeyResultType = {
  id?: number; // Optional for new items
  description: string;
  currentProgress: number;
  targetProgress: number;
  objectiveId?: number; // Optional until attached
  createdAt?: string;
  updatedAt?: string;
};

export type OKRType = {
  id?: number; // Optional for new items
  title: string;
  description: string;
  isCompleted: boolean;
  createdAt?: string;
  updatedAt?: string;
  keyResults: KeyResultType[];
};