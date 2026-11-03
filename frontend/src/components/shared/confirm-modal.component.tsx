import { useEffect, useRef } from 'react';
import { initModal } from '@/utils/modal.util';

type ConfirmModalProps = {
  id: string;
  title: string;
  message: string;
  onConfirm: () => void;
};

export function ConfirmModalComponent({ id, title, message, onConfirm }: ConfirmModalProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!modalRef.current) return undefined;
    const instance = initModal(modalRef.current, { dismissible: true });
    return () => instance.destroy();
  }, []);

  return (
    <div id={id} className="modal" ref={modalRef}>
      <div className="modal-content">
        <h5>{title}</h5>
        <p>{message}</p>
      </div>
      <div className="modal-footer">
        <button type="button" className="modal-close btn-flat">
          Cancelar
        </button>
        <button
          type="button"
          className="modal-close btn waves-effect waves-light"
          style={{ background: 'var(--trading-down)' }}
          onClick={onConfirm}
        >
          Confirmar exclusão
        </button>
      </div>
    </div>
  );
}
