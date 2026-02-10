import type { OKRType } from '../types/okr_types.tsx';

const SERVER_URL = 'http://localhost:3000/objective';

export const getAllOkrs = async (): Promise<OKRType[]> => {
  const response = await fetch(SERVER_URL);
  console.log(response);
  if (!response.ok) {
    throw new Error('Failed to fetch OKRs');
  }

  return response.json();
};

export const createOkr = async (okr: OKRType): Promise<OKRType> => {
  const response = await fetch(SERVER_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(okr),
  });

  if (!response.ok) {
    throw new Error('Failed to create OKR');
  }
  return response.json();
};

export const updateOkr = async (okr: Omit<OKRType, 'keyResults'>): Promise<OKRType> => {
  const response = await fetch(`${SERVER_URL}/${okr.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(okr),
  });
  if (!response.ok) {
    console.error(response.body);
    throw new Error('Failed to update OKR');
  }

  return response.json();
};

export const patchOkr = async (id: number, updates: Partial<OKRType>): Promise<OKRType> => {
  const response = await fetch(`${SERVER_URL}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  });

  if (!response.ok) {
    throw new Error('Failed to patch OKR');
  }
  return response.json();
};

export const deleteOkr = async (id: number): Promise<OKRType> => {
  const response = await fetch(`${SERVER_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete OKR');
  }
  return response.json();
};
