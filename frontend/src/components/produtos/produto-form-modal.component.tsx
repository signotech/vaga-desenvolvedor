import { useEffect, useRef, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import M from 'materialize-css';
import { useForm } from 'react-hook-form';
import type { Produto } from '@/models/produtos/produto.model';
import {
  produtoSchema,
  type ProdutoFormInput,
  type ProdutoFormValues,
} from '@/schemas/produtos/produto.schema';
import { initModal } from '@/utils/modal.util';

type ProdutoFormModalProps = {
  id: string;
  produto?: Produto | null;
  onSubmit: (payload: ProdutoFormValues) => Promise<string | null>;
};

export function ProdutoFormModalComponent({ id, produto, onSubmit }: ProdutoFormModalProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const produtoRef = useRef(produto);
  const [formError, setFormError] = useState<string | null>(null);
  produtoRef.current = produto;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProdutoFormInput, unknown, ProdutoFormValues>({
    resolver: zodResolver(produtoSchema),
    defaultValues: { sku: '', titulo: '', preco: 0, estoque: 0 },
  });

  useEffect(() => {
    if (!modalRef.current) return undefined;
    const instance = initModal(modalRef.current, {
      dismissible: true,
      onOpenStart: () => {
        const current = produtoRef.current;
        reset({
          sku: current?.sku ?? '',
          titulo: current?.titulo ?? '',
          preco: current ? Number(current.preco) : 0,
          estoque: current?.estoque ?? 0,
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
          const message = await onSubmit(values);
          if (message) {
            setFormError(message);
            return;
          }
          const instance = modalRef.current ? M.Modal.getInstance(modalRef.current) : null;
          instance?.close();
        })}
      >
        <div className="modal-content">
          <h5>{produto ? 'Editar produto' : 'Novo produto'}</h5>

          <div className="modal-form-stack">
            <label className="field field-grow">
              <span className="field-label">SKU</span>
              <input id={`${id}-sku`} className="field-control" type="text" {...register('sku')} />
              {errors.sku ? <span className="red-text">{errors.sku.message}</span> : null}
            </label>

            <label className="field field-grow">
              <span className="field-label">Título</span>
              <input
                id={`${id}-titulo`}
                className="field-control"
                type="text"
                {...register('titulo')}
              />
              {errors.titulo ? <span className="red-text">{errors.titulo.message}</span> : null}
            </label>

            <div className="modal-form-grid modal-form-grid-2">
              <label className="field">
                <span className="field-label">Preço</span>
                <input
                  id={`${id}-preco`}
                  className="field-control"
                  type="number"
                  min="0"
                  step="0.01"
                  {...register('preco')}
                />
                {errors.preco ? <span className="red-text">{errors.preco.message}</span> : null}
              </label>

              <label className="field">
                <span className="field-label">Estoque</span>
                <input
                  id={`${id}-estoque`}
                  className="field-control"
                  type="number"
                  min="0"
                  step="1"
                  {...register('estoque')}
                />
                {errors.estoque ? <span className="red-text">{errors.estoque.message}</span> : null}
              </label>
            </div>
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
