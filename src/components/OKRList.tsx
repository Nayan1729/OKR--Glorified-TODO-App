import type { OKRType } from '../types/okr_types.tsx';
import { KeyResultList } from './KeyResult.tsx';

interface OkrListProps {
  okrs: OKRType[];
  onEdit: (okr: OKRType) => void;
}

export const OkrList = ({ okrs, onEdit }: OkrListProps) => {
  if (!okrs.length) {
    return (
      <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
        <p className="text-gray-400 text-lg">No objectives found. Start by creating one!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8">
      {okrs.map((okr: OKRType, index: number) => (
        <div
          key={index}
          className={`bg-white rounded-4xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 ${okr.isCompleted ? 'opacity-90' : ''}`}
        >
          <div className="flex items-start gap-4 mb-6">
            <div className="flex items-center pt-1">
              <input
                type="checkbox"
                checked={okr.isCompleted}
                readOnly
                className="w-6 h-6 rounded-xl border-2 border-indigo-200 text-indigo-600 focus:ring-indigo-500 cursor-pointer transition-colors"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md">
                  Objective
                </span>
              </div>
              <h3
                className={`text-xl font-bold leading-tight ${okr.isCompleted ? 'text-gray-400 line-through' : 'text-gray-900'}`}
              >
                {okr.objective}
              </h3>
              <button
                type={'button'}
                onClick={() => {
                  onEdit(okr);
                }}
                className={'bg-purple-400 p-2 rounded-xl text-white mt-2'}
              >
                Edit
              </button>
            </div>
          </div>
          <div className="bg-gray-50/50 rounded-2xl p-6 border border-gray-100/50">
            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <span>🎯</span> Key Results
            </h4>
            <KeyResultList keyResults={okr.keyResults} />
          </div>
        </div>
      ))}
    </div>
  );
};
