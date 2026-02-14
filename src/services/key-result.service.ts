import type { KeyResultType, OKRType } from '../types/okr_types.tsx';

const SERVER_URL = 'http://localhost:3000/objective';

export const deleteKeyResultApi = async (keyResult: KeyResultType): Promise<OKRType> => {
  const objectiveId = keyResult.objectiveId;
  const result = await fetch(`${SERVER_URL}/${objectiveId}/key-result/${keyResult.id}`, {
    method: 'DELETE',
  });
  if (!result.ok) {
    throw new Error(`Failed to delete Key Result ${keyResult.id}`);
  }
  return result.json();
};

export const createKeyResultApi = async (keyResult: KeyResultType): Promise<OKRType> => {
  const objectiveId = keyResult.objectiveId;
  if (!objectiveId) {
    throw new Error('Objective ID is required to create a Key Result');
  }
  const result = await fetch(`${SERVER_URL}/${objectiveId}/key-result`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(keyResult),
  });

  if (!result.ok) {
    throw new Error(`Failed to create Key Result ${keyResult.description}`);
  }
  return result.json();
};

export const updateKeyResultApi = async (keyResult: KeyResultType): Promise<OKRType> => {
  const objectiveId = keyResult.objectiveId;
  const result = await fetch(`${SERVER_URL}/${objectiveId}/key-result/${keyResult.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(keyResult),
  });
  if (!result.ok) {
    throw new Error(`Failed to update Key Result ${keyResult.description}`);
  }
  return result.json();
};

export const updateKeyResultProgressApi = async (
  objectiveId: number,
  keyResultId: number,
  currentProgress: number,
): Promise<OKRType> => {
  const result = await fetch(`${SERVER_URL}/${objectiveId}/key-result/${keyResultId}/progress`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ currentProgress }),
  });
  if (!result.ok) {
    throw new Error(`Failed to update progress for Key Result ${keyResultId}`);
  }
  return result.json();
};
