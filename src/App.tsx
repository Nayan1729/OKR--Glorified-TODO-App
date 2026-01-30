import Modal from './components/Modal.tsx';
import OKRForm from './OKRForm.tsx';
import { useState } from 'react';

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <OKRForm />
      </Modal>
    </div>
  );
};
export default App;
