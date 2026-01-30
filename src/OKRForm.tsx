import { useState } from 'react';
import KeyResult from './components/KeyResult.tsx';
import KeyResultProvider from './providers/KeyResultProvider.tsx';

function OKRForm() {
  const [objective, setObjective] = useState('');

  return (
    <KeyResultProvider>
      <div className="min-h-screen flex items-start justify-center  pt-16 pb-12 selection:bg-indigo-100 selection:text-indigo-900">
        <form
          className="w-full max-w-xl bg-white p-10 shadow-[0_20px_50px_rgba(8,_112,_184,_0.1)] rounded-[2.5rem] border border-gray-50 animate-fade-in-down mx-4"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="text-center mb-10">
            <h2 className="text-4xl font-black text-gray-900 tracking-tight mb-2">OKR Planner</h2>
            <p className="text-gray-400 font-medium">Define your path to success</p>
          </div>

          {/* Objective Section */}
          <div className="mb-10">
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
                className="w-full border-2 border-gray-100 bg-gray-50/50 py-5 pl-16 pr-16 rounded-3xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:bg-white focus:border-indigo-500 transition-all duration-300 placeholder-gray-400 text-gray-800 text-lg font-semibold shadow-inner"
              />
              <span className="absolute right-5 top-1/2 -translate-y-1/2 text-2xl transition-transform group-focus-within:scale-125 duration-300">
                ✨
              </span>
            </div>
          </div>

          {/* Render Key Results */}
          <div className="bg-gray-50/50 p-6 rounded-[2rem] border border-gray-100 mb-8">
            <KeyResult />
          </div>

          {/* Divider */}
          <div className="relative flex py-4 items-center mb-6">
            <div className="flex-grow border-t border-gray-100"></div>
            <span className="flex-shrink mx-4 text-gray-300 text-xs font-bold uppercase tracking-widest">
              Finalize
            </span>
            <div className="flex-grow border-t border-gray-100"></div>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-5 rounded-3xl shadow-xl shadow-indigo-200 hover:shadow-indigo-300 transform transition-all active:scale-[0.98] duration-200 cursor-pointer text-lg"
          >
            Create Objective
          </button>
        </form>
      </div>
    </KeyResultProvider>
  );
}

export default OKRForm;
