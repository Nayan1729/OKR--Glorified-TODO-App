import type { KeyResultType } from '../types/okr_types.tsx';
import { useState } from 'react';
import React from 'react';

type KeyResultProps = {
  keyResultList: KeyResultType[];
  setKeyResultList: React.Dispatch<React.SetStateAction<KeyResultType[]>>;
};

const KeyResult = ({ keyResultList, setKeyResultList }: KeyResultProps) => {
  const [keyResult, setKeyResult] = useState<KeyResultType>({
    description: '',
    measure: '',
  });

  return (
    <div>
      <input
        type="text"
        placeholder="Key Result"
        value={keyResult.description}
        onChange={(e) =>
          setKeyResult((prev: KeyResultType) => ({
            ...prev,
            description: e.target.value,
          }))
        }
        className="border p-2 mb-3 rounded-xl"
      />

      {/* Key Result Measure */}
      <input
        type="text"
        placeholder="Key Result %"
        value={keyResult.measure}
        onChange={(e) =>
          setKeyResult((prev) => ({
            ...prev,
            measure: e.target.value,
          }))
        }
        className="border p-2 mb-3 rounded-xl"
      />

      {/* Add Key Result */}
      <button
        type="button"
        onClick={() => {
          if (!keyResult.description || !keyResult.measure) return;

          setKeyResultList((prev) => [...prev, keyResult]);
          setKeyResult({ description: '', measure: '' });
        }}
        className="bg-black text-white p-2 mb-3 rounded-xl"
      >
        Add Key Result
      </button>
      {keyResultList.map((kr, index) => (
        <div key={index} className="border p-2 mb-2 rounded-lg">
          <p>
            <strong>Description:</strong> {kr.description}
          </p>
          <p>
            <strong>Measure:</strong> {kr.measure}
          </p>
        </div>
      ))}
    </div>
  );
};
export default KeyResult;
