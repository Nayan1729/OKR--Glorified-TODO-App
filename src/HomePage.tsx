import Modal from './components/Modal.tsx';
import OKRForm from './OKRForm.tsx';
import { OkrList } from './components/OKRList.tsx';
import { useEffect, useState } from 'react';
import type { OKRType } from './types/okr_types.tsx';
import KeyResultProvider from './providers/KeyResultProvider.tsx';
import { getAllOkrs } from './services/okr.service.ts';

const HomePage = () => {
  const [okrs, setOkrs] = useState<OKRType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getAllOkrs()
      .then((data) => setOkrs(data))
      .catch((error) => {
        console.error(error);
        alert('Failed to load OKRs');
      });
  }, []);
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-10 bg-opacity-80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🎯</span>
              <h1 className="text-xl font-black text-gray-900 tracking-tight">OKR Tracker</h1>
            </div>
            <div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-6 rounded-xl shadow-lg shadow-indigo-200 transition-all duration-200 active:scale-95 cursor-pointer flex items-center gap-2"
              >
                <span className="text-lg">+</span>
                New Objective
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">My Objectives</h2>
          <p className="text-gray-500">Track and manage your goals effectively.</p>
        </div>
        <OkrList okrs={okrs} />
      </main>
      <KeyResultProvider>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <OKRForm onSuccess={() => setIsModalOpen(false)} setOkrs={setOkrs} />
        </Modal>
      </KeyResultProvider>
    </div>
  );
};
export default HomePage;
