import type { OKRType } from '../types/okr_types.tsx';
import { KeyResultList } from './KeyResult.tsx';

interface OkrListProps {
  okrs: OKRType[];
}

export const OkrList = ({ okrs }: OkrListProps) => {
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
          className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
        >
          <div className="flex items-start gap-4 mb-6">
            <div className="bg-indigo-50 p-3 rounded-2xl">
              <span className="text-2xl">🚩</span>
            </div>
            <div>
              <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-1">
                Objective
              </p>
              <h3 className="text-xl font-bold text-gray-900 leading-tight">{okr.objective}</h3>
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
