import React, { useState } from 'react';

type FormData = {
  objective: string;
  keyResult: string;
};

function App() {
  const [formData, setFormData] = useState<FormData>({
    objective: '',
    keyResult: '',
  });

  function changeInput(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(formData);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form
        className="w-100 border border-black p-4 flex flex-col rounded-xl transition-transform duration-300 hover:scale-[1.02]"
        onSubmit={(e) => {
          e.preventDefault();
          console.log('Submitted with values: ', formData);
        }}
      >
        <h2
          className="text-lg font-bold mb-4 text-center
                   animate-bounce"
        >
          OKR
        </h2>

        <input
          type="text"
          className="border border-black rounded-2xl p-2 mb-3 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="Objective"
          name="objective"
          onChange={(e) => changeInput(e)}
        />

        <input
          type="text"
          className="border border-black rounded-2xl p-2 mb-4 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="Key Result"
          name="keyResult"
          onChange={(e) => changeInput(e)}
        />

        <button
          type="submit"
          className="bg-black text-white p-2 mb-2 rounded-xl transition-all duration-300 hover:bg-gray-700 hover:scale-105 active:scale-95"
        >
          Submit
        </button>

        <button
          type="reset"
          className="bg-red-400 text-white p-2 transition-all rounded-xl duration-300 hover:bg-red-500 hover:scale-105 active:scale-95"
        >
          Clear
        </button>
      </form>
    </div>
  );
}

export default App;
