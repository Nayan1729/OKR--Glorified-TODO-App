import { useState, useEffect } from 'react';
import Modal from './Modal';
import { updateKeyResultProgressApi } from '../services/key-result.service';
import type { KeyResultType, OKRType } from '../types/okr_types.tsx';

interface ProgressModalProps {
  isOpen: boolean;
  onClose: () => void;
  keyResult: KeyResultType;
  setOkrs: (value: ((prevState: OKRType[]) => OKRType[]) | OKRType[]) => void;
}

const ProgressModal = ({ isOpen, onClose, keyResult, setOkrs }: ProgressModalProps) => {
  const [progress, setProgress] = useState(keyResult.currentProgress);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setProgress(keyResult.currentProgress);
  }, [keyResult.currentProgress, isOpen]);

  const handleSave = async () => {
    if (keyResult.objectiveId === undefined || keyResult.id === undefined) return;
    setLoading(true);
    try {
      const updatedObjective = await updateKeyResultProgressApi(
        keyResult.objectiveId,
        keyResult.id,
        progress
      );

      setOkrs((prevOkrs) =>
        prevOkrs.map((okr) => (okr.id === updatedObjective.id ? updatedObjective : okr))
      );
      onClose();
    } catch (error) {
      console.error(error);
      alert('Failed to update progress');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Update Progress</h3>
        <p className="text-gray-500 mb-6">{keyResult.description}</p>

        <div className="mb-8">
          <label htmlFor="progress" className="block text-sm font-medium text-gray-700 mb-2">
            Current Progress (Target: {keyResult.targetProgress})
          </label>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min="0"
              max={keyResult.targetProgress}
              value={progress}
              onChange={(e) => setProgress(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <input
              type="number"
              id="progress"
              value={progress}
              onChange={(e) => setProgress(Number(e.target.value))}
              className="w-24 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-lg font-semibold text-center"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-3 text-gray-700 font-semibold hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? 'Saving...' : 'Save Update'}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ProgressModal;
