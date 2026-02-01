import { createContext, useState } from 'react';
import type { KeyResultType } from '../types/okr_types.tsx';
import type { ChildrenPropsType } from '../types/children_props_types.tsx';
export type KeyResultListType = {
  keyResultList: KeyResultType[];
  validateKeyResult?: (a: KeyResultType) => void;
  resetKeyResults: () => void;
  addKeyResult: (a: KeyResultType) => void;
  updateKeyResultList: (a: KeyResultType, i: number) => void;
  deleteKeyResult: (a: KeyResultType) => void;
  setAllKeyResults: (a: KeyResultType[]) => void;
};

export const KeyResultContext = createContext<KeyResultListType>({
  keyResultList: [],
  validateKeyResult: () => {},
  addKeyResult: () => {},
  resetKeyResults: () => {},
  updateKeyResultList: () => {},
  deleteKeyResult: () => {},
  setAllKeyResults: () => {},
});

const KeyResultProvider = ({ children }: ChildrenPropsType) => {
  const [keyResultList, setKeyResultList] = useState<KeyResultType[]>([]);

  const validateKeyResult = (keyResult: KeyResultType) => {
    const measure: number = Number(keyResult.measure);
    if (!(keyResult.description.length >= 5 && !Number.isNaN(measure))) {
      throw new Error(
        'Error:: Provide keyResult description greater than 5 characters and measure should be number'
      );
    }

    if (measure < 0 || measure > 100) {
      throw new Error('keyResult must be in range (0-100)');
    }
  };

  const addKeyResult = (keyResult: KeyResultType) => {
    validateKeyResult(keyResult);
    setKeyResultList((prev) => [...prev, keyResult]);
  };

  const updateKeyResultList = (updatedKeyResult: KeyResultType, index: number) => {
    validateKeyResult(updatedKeyResult);

    setKeyResultList((prev) =>
      prev.map((kr, i) => (i === index ? { ...kr, ...updatedKeyResult } : kr))
    );
  };

  const deleteKeyResult = (keyResult: KeyResultType) => {
    if (confirm('Delete key result?')) {
      setKeyResultList((prev) => prev.filter((k) => k !== keyResult));
    }
  };

  const setAllKeyResults = (krs: KeyResultType[]) => {
    setKeyResultList(krs);
  };

  const resetKeyResults = () => {
    setKeyResultList([]);
  };

  return (
    <KeyResultContext.Provider
      value={{
        keyResultList,
        addKeyResult,
        resetKeyResults,
        updateKeyResultList,
        deleteKeyResult,
        setAllKeyResults,
      }}
    >
      {children}
    </KeyResultContext.Provider>
  );
};

export default KeyResultProvider;
