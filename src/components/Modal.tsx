import { type ReactNode } from 'react';

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: (a: boolean) => void;
}
const Modal = ({ children, isOpen, setIsOpen }: ModalProps) => {
  if (!isOpen) return <button onClick={() => setIsOpen(true)}>Add OKR</button>;
  return (
    <div className={'fixed inset-0 bg-gray-600/25   '}>
      <button onClick={() => setIsOpen(false)}>Close</button>
      {children}
    </div>
  );
};
export default Modal;
