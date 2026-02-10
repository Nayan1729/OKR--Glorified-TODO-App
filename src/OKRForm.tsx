import { useContext, useEffect, useState } from 'react';

import KeyResultForm from './components/KeyResultForm.tsx';
import { KeyResultContext } from './providers/KeyResultProvider.tsx';
import type { OKRType } from './types/okr_types.tsx';
import { createOkr, updateOkr } from './services/okr.service.ts';
import toast from 'react-hot-toast';

interface OKRFormProps {
  onSuccess: () => void;
  setOkrs: (value: ((prevState: OKRType[]) => OKRType[]) | OKRType[]) => void;
  editingOkr: OKRType | null;
}

function OKRForm({ onSuccess, setOkrs, editingOkr }: OKRFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { keyResultList, resetKeyResults, setAllKeyResults } = useContext(KeyResultContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingOkr) {
      setTitle(editingOkr.title);
      setDescription(editingOkr.description);
      setAllKeyResults(editingOkr.keyResults);
    }
  }, [editingOkr]);

  function addObjective() {
    const now = new Date().toISOString();
    const updatedKeyResults = keyResultList.map((keyResult) => ({
      ...keyResult,
    }));

    if (editingOkr) {
      const updatedOkr: OKRType = {
        ...editingOkr,
        title,
        description,
        updatedAt: now,
      };

      const { keyResults, ...updatedOkrWithoutKeyResults } = updatedOkr;
      updateOkr(updatedOkrWithoutKeyResults)
        .then((savedOkr) => {
          setOkrs((prev) => prev.map((okr) => (okr.id === savedOkr.id ? savedOkr : okr)));

          resetKeyResults();
          setTitle('');
          setDescription('');
          toast.success(`Objective ${savedOkr.title} successfully updated `);
          onSuccess();
        })
        .catch(() => {
          toast.error('Error Updating OKR');
        })
        .finally(() => {
          setLoading(false);
        });

      return;
    }
    const newOkr: OKRType = {
      title,
      description,
      keyResults: updatedKeyResults,
      isCompleted: false,
      createdAt: now,
      updatedAt: now,
    };

    setLoading(true);

    createOkr(newOkr)
      .then((savedOkr) => {
        onSuccess();
        setOkrs((prev) => [...prev, savedOkr]);
        resetKeyResults();
        setTitle('');
        setDescription('');
      })
      .catch((err) => {
        console.error(err);
        alert('Error creating okr');
      })
      .finally(() => setLoading(false));
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <form
      className="w-full p-6 selection:bg-indigo-100 selection:text-indigo-900"
      onSubmit={(e) => {
        e.preventDefault();
        addObjective();
      }}
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-black text-gray-900 tracking-tight mb-2">OKR Planner</h2>
        <p className="text-gray-400 font-medium text-sm">Define your path to success</p>
      </div>

      <div className="mb-8 space-y-4">
        <div>
          <label className="block text-xs font-bold text-indigo-600 uppercase tracking-[0.2em] mb-4 ml-1">
            Objective Title
          </label>
          <div className="relative group">
            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-2xl transition-transform group-focus-within:scale-125 duration-300">
              🚀
            </span>
            <input
              type="text"
              placeholder="What's the big goal?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border-2 border-gray-100 bg-gray-50/50 py-4 pl-16 pr-16 rounded-3xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:bg-white focus:border-indigo-500 transition-all duration-300 placeholder-gray-400 text-gray-800 text-lg font-semibold shadow-inner"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-indigo-600 uppercase tracking-[0.2em] mb-4 ml-1">
            Description
          </label>
          <div className="relative group">
            <textarea
              placeholder="Add more details..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border-2 border-gray-100 bg-gray-50/50 py-4 px-6 rounded-3xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:bg-white focus:border-indigo-500 transition-all duration-300 placeholder-gray-400 text-gray-800 text-base font-medium shadow-inner min-h-25"
            />
          </div>
        </div>
      </div>

      <div className="bg-gray-50/50 p-6 rounded-4xl border border-gray-100 mb-8">
        <KeyResultForm />
      </div>

      <div className="relative flex py-4 items-center mb-6">
        <div className="grow border-t border-gray-100"></div>
        <span className="shrink mx-4 text-gray-300 text-xs font-bold uppercase tracking-widest">
          Finalize
        </span>
        <div className="grow border-t border-gray-100"></div>
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-3xl shadow-xl shadow-indigo-200 hover:shadow-indigo-300 transform transition-all active:scale-[0.98] duration-200 cursor-pointer text-lg"
      >
        {editingOkr ? 'Update Objective' : 'Create Objective'}
      </button>
    </form>
  );
}

export default OKRForm;
