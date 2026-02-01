export type KeyResultType = {
  id: string;
  isCompleted: boolean;
  description: string;
  measure: string;
};
export type OKRType = {
  id: string;
  isCompleted: boolean;
  objective: string;
  keyResults: KeyResultType[];
};
