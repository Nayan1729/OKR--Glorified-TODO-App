import { useContext, useState } from 'react';
import { v4 as uuid } from 'uuid';

import KeyResultForm from './components/KeyResultForm.tsx';
import { KeyResultContext } from './providers/KeyResultProvider.tsx';
import type { OKRType } from './types/okr_types.tsx';

interface OKRFormProps {
  onSuccess: () => void;
  setOkrs: (value: ((prevState: OKRType[]) => OKRType[]) | OKRType[]) => void;
}

function OKRForm({ onSuccess, setOkrs }: OKRFormProps) {
  const [objective, setObjective] = useState('');
  const { keyResultList, resetKeyResults } = useContext(KeyResultContext);
  const [loading, setLoading] = useState(false);

  function addObjective() {
    const updatedKeyResults = keyResultList.map((keyResult) => ({
      ...keyResult,
      id: uuid(),
      isCompleted: false,
    }));

    const newOkr: OKRType = {
      id: uuid(),
      objective,
      keyResults: updatedKeyResults,
      isCompleted: false,
    };
    setObjective('');
    console.log(JSON.stringify(newOkr));
    setLoading(true);
    fetch('http://localhost:3000/okrs', {
      method: 'POST', // Specify the method
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newOkr),
    })
      .then(() => {
        onSuccess();
        setOkrs((prev) => [...prev, newOkr]);
        resetKeyResults();
      })
      .catch((err) => {
        console.log(err);
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

      <div className="mb-8">
        <label className="block text-xs font-bold text-indigo-600 uppercase tracking-[0.2em] mb-4 ml-1">
          Main Objective
        </label>
        <div className="relative group">
          <span className="absolute left-5 top-1/2 -translate-y-1/2 text-2xl transition-transform group-focus-within:scale-125 duration-300">
            🚀
          </span>
          <input
            type="text"
            placeholder="What's the big goal?"
            value={objective}
            onChange={(e) => setObjective(e.target.value)}
            className="w-full border-2 border-gray-100 bg-gray-50/50 py-4 pl-16 pr-16 rounded-3xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:bg-white focus:border-indigo-500 transition-all duration-300 placeholder-gray-400 text-gray-800 text-lg font-semibold shadow-inner"
          />
          <span className="absolute right-5 top-1/2 -translate-y-1/2 text-2xl transition-transform group-focus-within:scale-125 duration-300">
            ✨
          </span>
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
        Create Objective
      </button>
    </form>
  );
}

export default OKRForm;
