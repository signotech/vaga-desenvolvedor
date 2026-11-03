import { useEffect, useMemo, useRef, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import M from 'materialize-css';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { AutocompleteComponent } from '@/components/shared/autocomplete.component';
import type { Cliente } from '@/models/clientes/cliente.model';
import type { Pedido, PedidoInput } from '@/models/pedidos/pedido.model';
import { PEDIDO_STATUS } from '@/models/pedidos/pedido.model';
import type { Produto } from '@/models/produtos/produto.model';
import {
  pedidoSchema,
  type PedidoFormInput,
  type PedidoFormValues,
} from '@/schemas/pedidos/pedido.schema';
import { formatCpf } from '@/utils/cpf.util';
import { toDateInputValue } from '@/utils/date.util';
import { initModal } from '@/utils/modal.util';

type PedidoFormModalProps = {
  id: string;
  pedido?: Pedido | null;
  clientes: Cliente[];
  produtos: Produto[];
  onSubmit: (payload: PedidoInput) => Promise<string | null>;
};

export function PedidoFormModalComponent({
  id,
  pedido,
  clientes,
  produtos,
  onSubmit,
}: PedidoFormModalProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const pedidoRef = useRef(pedido);
  const [formError, setFormError] = useState<string | null>(null);
  pedidoRef.current = pedido;

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PedidoFormInput, unknown, PedidoFormValues>({
    resolver: zodResolver(pedidoSchema),
    defaultValues: {
      cliente_id: 0,
      data_pedido: toDateInputValue(new Date()),
      status: 'Em Aberto',
      desconto: 0,
      itens: [{ produto_id: 0, quantidade: 1 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'itens',
  });

  const clienteOptions = useMemo(
    () =>
      clientes.map((cliente) => ({
        value: cliente.id,
        label: cliente.nome,
        description: `${formatCpf(cliente.cpf)} · ${cliente.email}`,
      })),
    [clientes],
  );

  useEffect(() => {
    if (!modalRef.current) return undefined;
    const instance = initModal(modalRef.current, {
      dismissible: true,
      onOpenStart: () => {
        const current = pedidoRef.current;
        reset({
          cliente_id: current?.cliente_id ?? 0,
          data_pedido: toDateInputValue(current?.data_pedido ?? new Date()),
          status: current?.status ?? 'Em Aberto',
          desconto: current ? Number(current.desconto) : 0,
          itens: current?.itens?.length
            ? current.itens.map((item) => ({
                produto_id: item.produto_id,
                quantidade: item.quantidade,
              }))
            : [{ produto_id: 0, quantidade: 1 }],
        });
        setFormError(null);
      },
    });
    return () => instance.destroy();
  }, [reset]);

  return (
    <div id={id} className="modal modal-fixed-footer" ref={modalRef}>
      <form
        onSubmit={handleSubmit(async (values) => {
          setFormError(null);
          const payload: PedidoInput = {
            cliente_id: values.cliente_id,
            data_pedido: values.data_pedido
              ? new Date(values.data_pedido).toISOString()
              : undefined,
            status: values.status,
            desconto: values.desconto,
            itens: values.itens,
          };
          const message = await onSubmit(payload);
          if (message) {
            setFormError(message);
            return;
          }
          const modalInstance = modalRef.current ? M.Modal.getInstance(modalRef.current) : null;
          modalInstance?.close();
        })}
      >
        <div className="modal-content">
          <h5>{pedido ? 'Editar pedido' : 'Novo pedido'}</h5>

          <div className="modal-form-grid">
            <Controller
              name="cliente_id"
              control={control}
              render={({ field }) => (
                <AutocompleteComponent
                  id={`${id}-cliente`}
                  label="Cliente"
                  placeholder="Buscar por nome, CPF ou e-mail"
                  options={clienteOptions}
                  value={Number(field.value) || 0}
                  onChange={field.onChange}
                  error={errors.cliente_id?.message}
                  emptyMessage="Nenhum cliente encontrado"
                />
              )}
            />

            <label className="field field-span-2">
              <span className="field-label">Data do pedido</span>
              <input
                id={`${id}-data`}
                className="field-control"
                type="datetime-local"
                {...register('data_pedido')}
              />
            </label>

            <label className="field">
              <span className="field-label">Status</span>
              <select className="browser-default field-control" {...register('status')}>
                {PEDIDO_STATUS.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>

            <label className="field">
              <span className="field-label">Desconto</span>
              <input
                id={`${id}-desconto`}
                className="field-control"
                type="number"
                min="0"
                step="0.01"
                {...register('desconto')}
              />
              {errors.desconto ? <span className="red-text">{errors.desconto.message}</span> : null}
            </label>
          </div>

          <h6 className="modal-section-title">Itens</h6>
          {fields.map((field, index) => (
            <div className="item-row" key={field.id}>
              <label className="field field-grow">
                <span className="field-label">Produto</span>
                <select
                  className="browser-default field-control"
                  {...register(`itens.${index}.produto_id`)}
                >
                  <option value={0}>Selecione o produto</option>
                  {produtos.map((produto) => (
                    <option key={produto.id} value={produto.id}>
                      {produto.titulo}
                    </option>
                  ))}
                </select>
                {errors.itens?.[index]?.produto_id ? (
                  <span className="red-text">{errors.itens[index]?.produto_id?.message}</span>
                ) : null}
              </label>

              <label className="field field-compact">
                <span className="field-label">Qtd</span>
                <input
                  className="field-control"
                  type="number"
                  min="1"
                  {...register(`itens.${index}.quantidade`)}
                />
                {errors.itens?.[index]?.quantidade ? (
                  <span className="red-text">{errors.itens[index]?.quantidade?.message}</span>
                ) : null}
              </label>

              <button
                type="button"
                className="btn-flat danger-text item-row-remove"
                disabled={fields.length === 1}
                onClick={() => remove(index)}
                aria-label="Remover item"
              >
                <i className="material-icons">remove_circle</i>
              </button>
            </div>
          ))}

          {errors.itens?.message ? <span className="red-text">{errors.itens.message}</span> : null}
          {errors.itens?.root?.message ? (
            <span className="red-text">{errors.itens.root.message}</span>
          ) : null}

          <button
            type="button"
            className="btn-flat waves-effect"
            onClick={() => append({ produto_id: 0, quantidade: 1 })}
          >
            <i className="material-icons left">add</i>
            Adicionar item
          </button>

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
