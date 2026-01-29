import { useContext, useState } from 'react';
import type { KeyResultType } from '../types/okr_types.tsx';
import { KeyResultContext } from '../providers/KeyResultProvider.tsx';

const KeyResult = () => {
  const [keyResult, setKeyResult] = useState<KeyResultType>({
    description: '',
    measure: '',
  });
  const { keyResultList, validateKeyResult } = useContext(KeyResultContext);

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

      <button
        type="button"
        onClick={() => {
          if (!keyResult.description || !keyResult.measure) return;
          try {
            validateKeyResult(keyResult);
          } catch (e) {
            if (e instanceof Error) alert(e.message);
          }

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
