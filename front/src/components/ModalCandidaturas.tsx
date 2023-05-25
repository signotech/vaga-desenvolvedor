import React from 'react';
import ReactModal from 'react-modal';
import '../components/scss/modal.scss';

ReactModal.setAppElement('#root');

interface ModalCandidaturasProps {
  isOpen: boolean;
  onRequestClose: () => void;
  children: React.ReactNode;
}

const ModalCandidaturas: React.FC<ModalCandidaturasProps> = ({
  isOpen,
  onRequestClose,
  children,
}) => {
  return (
    <ReactModal
      className='modal-candidaturas'
      overlayClassName='modal-overlay'
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
    >
      {children}
    </ReactModal>
  );
};

export default ModalCandidaturas;
