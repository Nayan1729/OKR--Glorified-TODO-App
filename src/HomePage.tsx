import Modal from './components/Modal.tsx';
import OKRForm from './OKRForm.tsx';
import { OkrList } from './components/OKRList.tsx';
import { useEffect, useState } from 'react';

const HomePage = () => {
  const [okrs, setOkrs] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3000/okrs')
      .then((res) => res.json())
      .then((data) => setOkrs(data))
      .catch((error) => console.log(error));
  }, []);
  return (
    <div>
      <OkrList okrs={okrs} />
      <Modal>
        <OKRForm />
      </Modal>
    </div>
  );
};
export default HomePage;
