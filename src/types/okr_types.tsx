export type KeyResultType = {
  id: string;
  isCompleted: boolean;
  description: string;
  measure: string;
};
export type OKRType = {
  id: string;
  objective: string;
  keyResults: KeyResultType[];
};
