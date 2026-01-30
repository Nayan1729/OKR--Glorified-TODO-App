import { createContext, useState } from 'react';
import type { KeyResultType } from '../types/okr_types.tsx';
import type { ChildrenPropsType } from '../types/children_props_types.tsx';
export type KeyResultListType = {
  keyResultList: KeyResultType[];
  validateKeyResult: (a: KeyResultType) => void;
};

export const KeyResultContext = createContext<KeyResultListType>({
  keyResultList: [],
  validateKeyResult: () => {},
});

const KeyResultProvider = ({ children }: ChildrenPropsType) => {
  const [keyResultList, setKeyResultList] = useState<KeyResultType[]>([]);

  const validateKeyResult = (keyResult: KeyResultType) => {
    if (!(keyResult.description.length >= 5 && keyResult.measure.endsWith('%'))) {
      throw new Error(
        'Error:: Provide keyResult description greater than 5 and provide measure in %.'
      );
    }
    setKeyResultList((prev) => [...prev, keyResult]);
  };

  return (
    <KeyResultContext.Provider value={{ keyResultList, validateKeyResult }}>
      {children}
    </KeyResultContext.Provider>
  );
};

export default KeyResultProvider;
