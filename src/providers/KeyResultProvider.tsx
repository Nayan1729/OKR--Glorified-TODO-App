import { createContext, useState } from 'react';
import type { KeyResultType } from '../types/okr_types.tsx';
import type { ChildrenPropsType } from '../types/children_props_types.tsx';
export type KeyResultListType = {
  keyResultList: KeyResultType[];
  validateKeyResult: (a: KeyResultType) => void;
  resetKeyResults: () => void;
};

export const KeyResultContext = createContext<KeyResultListType>({
  keyResultList: [],
  validateKeyResult: () => {},
  resetKeyResults: () => {},
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
    setKeyResultList((prev) => [...prev, keyResult]);
  };

  const resetKeyResults = () => {
    setKeyResultList([]);
  };

  return (
    <KeyResultContext.Provider value={{ keyResultList, validateKeyResult, resetKeyResults }}>
      {children}
    </KeyResultContext.Provider>
  );
};

export default KeyResultProvider;
