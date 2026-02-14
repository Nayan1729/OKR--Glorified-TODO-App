import type { OKRType } from '../types/okr_types.tsx';
import { KeyResultList } from './KeyResult.tsx';
import { deleteOkr } from '../services/okr.service.ts';

interface OkrListProps {
  okrs: OKRType[];
  onEdit: (okr: OKRType) => void;
  setOkrs: (value: ((prevState: OKRType[]) => OKRType[]) | OKRType[]) => void;
}

export const OkrList = ({ okrs, onEdit, setOkrs }: OkrListProps) => {
  function onDelete(okrId: number) {
    deleteOkr(okrId)
      .then((deletedOkr) => {
        setOkrs((prevOkrs) => prevOkrs.filter((prevOkr) => prevOkr.id !== deletedOkr.id));
        console.log(deletedOkr);
      })
      .catch((error) => {
        console.error(error);
        alert(`Error deleting okr with id ${okrId}`);
      });
  }

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
          key={okr.id || index}
          className={`bg-white rounded-4xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 ${okr.isCompleted ? 'opacity-90' : ''}`}
        >
          <div className="flex items-start gap-4 mb-6">
            <div className="flex items-center pt-1"></div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md">
                  Objective
                </span>
              </div>
              <h3
                className={`text-xl font-bold leading-tight ${okr.isCompleted ? 'text-gray-400 line-through' : 'text-gray-900'}`}
              >
                {okr.title}
              </h3>
              {okr.description && <p className="text-gray-500 mt-2 text-sm">{okr.description}</p>}

              <div className="mt-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Overall Progress
                  </span>
                  <span className="text-xs font-bold text-indigo-600">
                    {okr.keyResults.length > 0
                      ? Math.round(
                          (okr.keyResults.reduce(
                            (acc, kr) => acc + kr.currentProgress / kr.targetProgress,
                            0
                          ) /
                            okr.keyResults.length) *
                            100
                        )
                      : 0}
                    %
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-indigo-500 h-full transition-all duration-500 ease-out"
                    style={{
                      width: `${
                        okr.keyResults.length > 0
                          ? Math.min(
                              100,
                              Math.round(
                                (okr.keyResults.reduce(
                                  (acc, kr) => acc + kr.currentProgress / kr.targetProgress,
                                  0
                                ) /
                                  okr.keyResults.length) *
                                  100
                              )
                            )
                          : 0
                      }%`,
                    }}
                  ></div>
                </div>
              </div>

              <button
                type={'button'}
                onClick={() => {
                  onEdit(okr);
                }}
                className={'bg-purple-400 p-2 rounded-xl text-white mt-2 cursor-pointer'}
              >
                Edit
              </button>
              <button
                type={'button'}
                onClick={() => {
                  if (okr.id != null) {
                    onDelete(okr.id);
                  }
                }}
                className={'bg-red-600 p-2 rounded-xl text-white mt-2 ml-2 cursor-pointer'}
              >
                Delete
              </button>
            </div>
          </div>
          <div className="bg-gray-50/50 rounded-2xl p-6 border border-gray-100/50">
            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <span>🎯</span> Key Results
            </h4>
            <KeyResultList keyResults={okr.keyResults} setOkrs={setOkrs} />
          </div>
        </div>
      ))}
    </div>
  );
};
