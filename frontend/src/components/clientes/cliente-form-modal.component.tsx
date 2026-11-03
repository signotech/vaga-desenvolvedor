import { useEffect, useRef, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import M from 'materialize-css';
import { useForm } from 'react-hook-form';
import type { Cliente } from '@/models/clientes/cliente.model';
import {
  clienteSchema,
  toClientePayload,
  type ClienteFormValues,
} from '@/schemas/clientes/cliente.schema';
import { formatCpf, onlyDigits } from '@/utils/cpf.util';
import { initModal } from '@/utils/modal.util';

type ClienteFormModalProps = {
  id: string;
  cliente?: Cliente | null;
  onSubmit: (payload: { nome: string; cpf: string; email: string }) => Promise<string | null>;
};

export function ClienteFormModalComponent({ id, cliente, onSubmit }: ClienteFormModalProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const clienteRef = useRef(cliente);
  const [formError, setFormError] = useState<string | null>(null);
  clienteRef.current = cliente;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ClienteFormValues>({
    resolver: zodResolver(clienteSchema),
    defaultValues: { nome: '', cpf: '', email: '' },
  });

  useEffect(() => {
    if (!modalRef.current) return undefined;
    const instance = initModal(modalRef.current, {
      dismissible: true,
      onOpenStart: () => {
        const current = clienteRef.current;
        reset({
          nome: current?.nome ?? '',
          cpf: current ? formatCpf(current.cpf) : '',
          email: current?.email ?? '',
        });
        setFormError(null);
      },
    });
    return () => instance.destroy();
  }, [reset]);

  return (
    <div id={id} className="modal" ref={modalRef}>
      <form
        onSubmit={handleSubmit(async (values) => {
          setFormError(null);
          const message = await onSubmit(toClientePayload(values));
          if (message) {
            setFormError(message);
            return;
          }
          const instance = modalRef.current ? M.Modal.getInstance(modalRef.current) : null;
          instance?.close();
        })}
      >
        <div className="modal-content">
          <h5>{cliente ? 'Editar cliente' : 'Novo cliente'}</h5>

          <div className="modal-form-stack">
            <label className="field field-grow">
              <span className="field-label">Nome</span>
              <input id={`${id}-nome`} className="field-control" type="text" {...register('nome')} />
              {errors.nome ? <span className="red-text">{errors.nome.message}</span> : null}
            </label>

            <label className="field field-grow">
              <span className="field-label">CPF</span>
              <input
                id={`${id}-cpf`}
                className="field-control"
                type="text"
                {...register('cpf')}
                onChange={(event) => {
                  setValue('cpf', formatCpf(onlyDigits(event.target.value)), {
                    shouldValidate: true,
                  });
                }}
              />
              {errors.cpf ? <span className="red-text">{errors.cpf.message}</span> : null}
            </label>

            <label className="field field-grow">
              <span className="field-label">E-mail</span>
              <input
                id={`${id}-email`}
                className="field-control"
                type="email"
                {...register('email')}
              />
              {errors.email ? <span className="red-text">{errors.email.message}</span> : null}
            </label>
          </div>

          {formError ? <p className="red-text">{formError}</p> : null}
        </div>
        <div className="modal-footer">
          <button type="button" className="modal-close btn-flat">
            Cancelar
          </button>
          <button
            type="submit"
            className="btn waves-effect waves-light accent-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Salvando...' : 'Salvar'}
          </button>
        </div>
      </form>
    </div>
  );
}
