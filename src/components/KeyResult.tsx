import type { KeyResultType } from '../types/okr_types.tsx';

interface KeyResultProps {
  keyResult: KeyResultType;
  index: number;
}
export const KeyResult = ({ keyResult, index }: KeyResultProps) => {
  const isCompleted = keyResult.currentProgress >= keyResult.targetProgress;
  return (
    <div
      key={keyResult.id}
      className={`bg-white border border-gray-100 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in-up flex items-center gap-4 group ${isCompleted ? 'opacity-75' : ''}`}
    >
      <div className="flex-1">
        <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-1">
          Key Result #{index + 1}
        </p>
        <p
          className={`font-semibold leading-snug ${isCompleted ? 'text-gray-400 line-through' : 'text-gray-800'}`}
        >
          {keyResult.description}
        </p>
      </div>
      <div
        className={`ml-2 px-4 py-2 rounded-xl text-sm font-black shadow-lg transition-all ${
          isCompleted
            ? 'bg-gray-100 text-gray-400 shadow-none'
            : 'bg-indigo-600 text-white shadow-indigo-100'
        }`}
      >
        {keyResult.currentProgress} / {keyResult.targetProgress}
      </div>
    </div>
  );
};

export interface KeyResultListProps {
  keyResults: KeyResultType[];
}

export function KeyResultList({ keyResults }: KeyResultListProps) {
  return (
    <div className="space-y-3">
      {(keyResults || []).map((keyResult: KeyResultType, index: number) => {
        return (
          <div
            key={keyResult.id || index}
            className={`p-4 rounded-lg transition-all ${
              index % 2 === 0 && 'bg-blue-50 border border-blue-200'
            }`}
          >
            <KeyResult keyResult={keyResult} index={index} />
          </div>
        );
      })}
    </div>
  );
}
