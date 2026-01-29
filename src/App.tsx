import { useState } from 'react';
import type { KeyResultType } from './types/okr_types.tsx';
import KeyResult from './components/KeyResult.tsx';

function App() {
  const [objective, setObjective] = useState('');
  const [keyResultList, setKeyResultList] = useState<KeyResultType[]>([]);

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form
        className="w-100 border border-black p-4 flex flex-col rounded-xl"
        onSubmit={(e) => {
          e.preventDefault();
          console.log({
            objective,
            keyResults: keyResultList,
          });
        }}
      >
        <h2 className="text-lg font-bold mb-4 text-center">OKR</h2>

        {/* Objective */}
        <input
          type="text"
          placeholder="Objective"
          value={objective}
          onChange={(e) => setObjective(e.target.value)}
          className="border p-2 mb-3 rounded-xl"
        />

        {/* Key Result Description */}

        {/* Render Key Results */}
        <KeyResult setKeyResultList={setKeyResultList} keyResultList={keyResultList} />

        <button type="submit" className="bg-black text-white p-2 rounded-xl mt-3">
          Add Objective
        </button>
      </form>
    </div>
  );
}

export default App;
