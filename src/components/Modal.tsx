import { type ReactNode, useState } from 'react';

interface ModalProps {
  children: ReactNode;
  openLabelText?: string;
  closeLabelText?: string;
}
const Modal = ({ children, openLabelText = 'Open', closeLabelText = 'Close' }: ModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!isOpen) return <button onClick={() => setIsOpen(true)}>{openLabelText}</button>;
  return (
    <div className={'fixed inset-0 bg-gray-600/25   '}>
      <button onClick={() => setIsOpen(false)}>{closeLabelText}</button>
      {children}
    </div>
  );
};
export default Modal;
