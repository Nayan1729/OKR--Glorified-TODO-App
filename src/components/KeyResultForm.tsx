import { useContext, useState } from 'react';
import type { KeyResultType } from '../types/okr_types.tsx';
import { KeyResultContext } from '../providers/KeyResultProvider.tsx';

const KeyResultForm = () => {
  const [keyResult, setKeyResult] = useState<KeyResultType>({
    id: '',
    isCompleted: false,
    description: '',
    measure: '',
  });
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const { keyResultList, addKeyResult, updateKeyResultList, deleteKeyResult } =
    useContext(KeyResultContext);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="bg-indigo-100 p-2 rounded-lg">
          <span className="text-xl">🎯</span>
        </div>
        <h3 className="text-sm font-black text-indigo-900 uppercase tracking-[0.15em]">
          Key Results
        </h3>
      </div>

      <div className="space-y-4">
        <div className="group">
          <input
            type="text"
            placeholder="Describe a key result (min 5 characters)"
            value={keyResult.description}
            onChange={(e) =>
              setKeyResult((prev: KeyResultType) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            className="w-full border-2 border-gray-100 bg-white p-4 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all duration-300 placeholder-gray-400 text-gray-700 font-medium"
          />
        </div>

        <div className="group">
          <input
            type="text"
            placeholder="Measure (e.g. 80%)"
            value={keyResult.measure}
            onChange={(e) =>
              setKeyResult((prev) => ({
                ...prev,
                measure: e.target.value,
              }))
            }
            className="w-full border-2 border-gray-100 bg-white p-4 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all duration-300 placeholder-gray-400 text-gray-700 font-medium"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() =>
            setKeyResult({
              id: '',
              isCompleted: false,
              description: '',
              measure: '',
            })
          }
          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold py-4 rounded-2xl transition-all duration-300 cursor-pointer text-sm"
        >
          Clear
        </button>

        <button
          type="button"
          onClick={() => {
            if (!keyResult.description || !keyResult.measure) return;
            try {
              if (editingIndex !== null) {
                updateKeyResultList(keyResult, editingIndex);
                setEditingIndex(null);
              } else {
                addKeyResult(keyResult);
              }
            } catch (e) {
              if (e instanceof Error) alert(e.message);
              return;
            }

            setKeyResult({
              id: '',
              isCompleted: false,
              description: '',
              measure: '',
            });
          }}
          className="w-full bg-white border-2 border-indigo-100 hover:border-indigo-600 text-indigo-600 font-bold py-4 rounded-2xl transition-all duration-300 shadow-sm hover:shadow-indigo-100 flex items-center justify-center gap-2 group cursor-pointer text-sm"
        >
          {editingIndex === null ? 'Add' : 'Update'}
        </button>
      </div>

      <div className="space-y-3 pt-2">
        {keyResultList.map((kr, index) => (
          <div
            key={index}
            className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in-up flex justify-between items-center group"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex-1">
              <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-1">
                Key Result #{index + 1}
              </p>
              <p className="text-gray-800 font-semibold leading-snug">{kr.description}</p>
            </div>
            <div className="ml-4 bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-black shadow-lg shadow-indigo-100">
              {kr.measure}%
            </div>
            <div className={'flex items-center justify-center gap-2 ml-1.5'}>
              <button
                type={'button'}
                className={'bg-blue-600 p-2 rounded-2xl'}
                onClick={() => {
                  setKeyResult(kr);
                  setEditingIndex(index);
                }}
              >
                Edit
              </button>
              <button
                type={'button'}
                className={'bg-red-500 p-2 rounded-2xl'}
                onClick={() => {
                  deleteKeyResult(kr);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default KeyResultForm;
