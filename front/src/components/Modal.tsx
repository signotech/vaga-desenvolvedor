import React from 'react';
import ReactModal from 'react-modal';
import '../components/scss/modal.scss'


ReactModal.setAppElement('#root');

interface ModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onRequestClose, children }) => {
  return (
    <ReactModal className='modal' isOpen={isOpen} onRequestClose={onRequestClose}>
      {children}
    </ReactModal>
  );
};

export default Modal;
