import type { KeyResultType, OKRType } from '../types/okr_types.tsx';
import { useState } from 'react';
import ProgressModal from './ProgressModal.tsx';

interface KeyResultProps {
  keyResult: KeyResultType;
  index: number;
  setOkrs: (value: ((prevState: OKRType[]) => OKRType[]) | OKRType[]) => void;
}
export const KeyResult = ({ keyResult, index, setOkrs }: KeyResultProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isCompleted = keyResult.currentProgress >= keyResult.targetProgress;
  const progressPercentage =
    keyResult.targetProgress > 0
      ? Math.min(100, Math.round((keyResult.currentProgress / keyResult.targetProgress) * 100))
      : 0;

  return (
    <>
      <div
        key={keyResult.id}
        className={`bg-white border border-gray-100 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in-up flex flex-col gap-3 group ${isCompleted ? 'opacity-75' : ''}`}
      >
        <div className="flex items-center justify-between w-full">
          <div className="flex-1 pr-4">
            <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-1">
              Key Result #{index + 1}
            </p>
            <p
              className={`font-semibold leading-snug ${isCompleted ? 'text-gray-400 line-through' : 'text-gray-800'}`}
            >
              {keyResult.description}
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className={`px-4 py-2 rounded-xl text-sm font-black shadow-lg transition-all cursor-pointer whitespace-nowrap ${
              isCompleted
                ? 'bg-gray-100 text-gray-400 shadow-none hover:bg-gray-200'
                : 'bg-indigo-600 text-white shadow-indigo-100 hover:bg-indigo-700 active:scale-95'
            }`}
          >
            {keyResult.currentProgress} / {keyResult.targetProgress}
          </button>
        </div>

        <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
          <div
            className={`h-full transition-all duration-500 ease-out ${isCompleted ? 'bg-green-500' : 'bg-indigo-500'}`}
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {isModalOpen && (
        <ProgressModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          keyResult={keyResult}
          setOkrs={setOkrs}
        />
      )}
    </>
  );
};

export interface KeyResultListProps {
  keyResults: KeyResultType[];
  setOkrs: (value: ((prevState: OKRType[]) => OKRType[]) | OKRType[]) => void;
}

export function KeyResultList({ keyResults, setOkrs }: KeyResultListProps) {
  return (
    <div className="space-y-3">
      {(keyResults || []).map((keyResult: KeyResultType, index: number) => {
        return (
          <div
            key={keyResult.id || index}
            className={`p-4 rounded-lg transition-all ${
              index % 2 !== 0
                ? 'bg-orange-500 border border-red-400'
                : 'bg-blue-50 border border-blue-200'
            }`}
          >
            <KeyResult keyResult={keyResult} index={index} setOkrs={setOkrs} />
          </div>
        );
      })}
    </div>
  );
}
