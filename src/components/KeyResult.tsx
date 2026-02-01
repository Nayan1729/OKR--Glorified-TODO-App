import type { KeyResultType } from '../types/okr_types.tsx';

interface KeyResultProps {
  keyResult: KeyResultType;
  index: number;
}
const KeyResult = ({ keyResult, index }: KeyResultProps) => {
  return (
    <div
      key={index}
      className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in-up flex justify-between items-center group"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex-1">
        <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-1">
          Key Result #{index + 1}
        </p>
        <p className="text-gray-800 font-semibold leading-snug">{keyResult.description}</p>
      </div>
      <div className="ml-4 bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-black shadow-lg shadow-indigo-100">
        {keyResult.measure}
      </div>
    </div>
  );
};

export default KeyResult;

export interface KeyResultListProps {
  keyResults: KeyResultType[];
}

export function KeyResultList({ keyResults }: KeyResultListProps) {
  return (
    <div>
      {keyResults.map((keyResult: KeyResultType, index: number) => (
        <KeyResult key={index} keyResult={keyResult} index={index} />
      ))}
    </div>
  );
}
