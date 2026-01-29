import React, { createContext, useState } from 'react';
import type { KeyResultType } from '../types/okr_types.tsx';
import type { ChildrenPropsType } from '../types/children_props_types.tsx';

export type KeyResultListType = {
  keyResultList: KeyResultType[];
  setKeyResultList: React.Dispatch<React.SetStateAction<KeyResultType[]>>;
};

export const KeyResultContext = createContext<KeyResultListType>({
  keyResultList: [],
  setKeyResultList: () => {},
});

const KeyResultProvider = ({ children }: ChildrenPropsType) => {
  const [keyResultList, setKeyResultList] = useState<KeyResultType[]>([]);

  return (
    <KeyResultContext.Provider value={{ keyResultList, setKeyResultList }}>
      {children}
    </KeyResultContext.Provider>
  );
};
export default KeyResultProvider;
