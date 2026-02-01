import Modal from './components/Modal.tsx';
import OKRForm from './OKRForm.tsx';
import { OkrList } from './components/OKRList.tsx';

const HomePage = () => {
  const okrs = [
    {
      id: 'okr-1',
      objective: 'Improve onboarding experience for new users',
      keyResults: [
        {
          id: 'kr-1',
          isCompleted: false,
          description: 'Reduce onboarding completion time',
          measure: '50%',
        },
      ],
    },
  ];

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
