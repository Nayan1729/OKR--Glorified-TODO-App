import type { KeyResultType } from '../types/okr_types.tsx';

const SERVER_URL = 'http://localhost:3000/objective';

export const deleteKeyResultApi = async (keyResult: KeyResultType): Promise<void> => {
  const objectiveId = keyResult.objectiveId;
  const result = await fetch(`${SERVER_URL}/${objectiveId}/key-result/${keyResult.id}`, {
    method: 'DELETE',
  });
  if (!result.ok) {
    throw new Error(`Failed to delete Key Result ${keyResult.id}`);
  }
  return result.json();
};

export const updateKeyResultApi = async (keyResult: KeyResultType): Promise<void> => {
  const objectiveId = keyResult.objectiveId;
  const result = await fetch(`${SERVER_URL}/${objectiveId}/key-result/${keyResult.id}`, {
    method: 'PATCH',
    body: JSON.stringify({ keyResult }),
  });
  if (!result.ok) {
    throw new Error(`Failed to update Key Result ${keyResult.description}`);
  }
  return result.json();
};
