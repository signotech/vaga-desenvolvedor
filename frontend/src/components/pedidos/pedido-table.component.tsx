import { Link } from 'react-router-dom';
import { PedidoStatusChipComponent } from '@/components/pedidos/pedido-status-chip.component';
import {
  RowSelectCellComponent,
  RowSelectHeaderComponent,
} from '@/components/shared/row-select-cell.component';
import { SortableThComponent } from '@/components/shared/sortable-th.component';
import { APP_ROUTES } from '@/constants/app/app.constants';
import type { Pedido } from '@/models/pedidos/pedido.model';
import type { SortOrder } from '@/types/api-response.type';
import { formatCurrency } from '@/utils/currency.util';
import { formatDateTime } from '@/utils/date.util';

type PedidoTableProps = {
  items: Pedido[];
  sortBy: string;
  sortOrder: SortOrder;
  selectedIds: Set<number>;
  allSelected: boolean;
  someSelected: boolean;
  onToggleAll: () => void;
  onToggle: (id: number) => void;
  onSort: (field: string) => void;
  onEdit: (pedido: Pedido) => void;
  onDelete: (pedido: Pedido) => void;
};

export function PedidoTableComponent({
  items,
  sortBy,
  sortOrder,
  selectedIds,
  allSelected,
  someSelected,
  onToggleAll,
  onToggle,
  onSort,
  onEdit,
  onDelete,
}: PedidoTableProps) {
  return (
    <table className="responsive-table data-cards">
      <thead>
        <tr>
          <RowSelectHeaderComponent
            checked={allSelected}
            indeterminate={someSelected && !allSelected}
            onChange={onToggleAll}
          />
          <SortableThComponent label="ID" field="id" sortBy={sortBy} sortOrder={sortOrder} onSort={onSort} />
          <SortableThComponent
            label="Cliente"
            field="cliente_id"
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSort={onSort}
          />
          <SortableThComponent
            label="Data"
            field="data_pedido"
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSort={onSort}
          />
          <SortableThComponent
            label="Status"
            field="status"
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSort={onSort}
          />
          <th>Itens</th>
          <SortableThComponent
            label="Desconto"
            field="desconto"
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSort={onSort}
          />
          <th className="right-align">Ações</th>
        </tr>
      </thead>
      <tbody>
        {items.map((pedido) => (
          <tr key={pedido.id}>
            <RowSelectCellComponent
              checked={selectedIds.has(pedido.id)}
              onChange={() => onToggle(pedido.id)}
              label={`Selecionar pedido ${pedido.id}`}
            />
            <td data-label="ID">{pedido.id}</td>
            <td data-label="Cliente">
              {pedido.cliente ? (
                <Link className="link-quiet" to={`${APP_ROUTES.clientes}?highlight=${pedido.cliente.id}`}>
                  {pedido.cliente.nome}
                </Link>
              ) : (
                `#${pedido.cliente_id}`
              )}
            </td>
            <td data-label="Data">{formatDateTime(pedido.data_pedido)}</td>
            <td data-label="Status">
              <PedidoStatusChipComponent status={pedido.status} />
            </td>
            <td data-label="Itens">
              {(pedido.itens ?? []).map((item) => (
                <div key={item.id}>
                  {item.produto ? (
                    <Link className="link-quiet" to={`${APP_ROUTES.produtos}?highlight=${item.produto.id}`}>
                      {item.produto.titulo}
                    </Link>
                  ) : (
                    `Produto #${item.produto_id}`
                  )}{' '}
                  × {item.quantidade}
                </div>
              ))}
            </td>
            <td data-label="Desconto">{formatCurrency(pedido.desconto)}</td>
            <td data-label="Ações" className="table-actions">
              <button
                type="button"
                className="btn-flat waves-effect"
                onClick={() => onEdit(pedido)}
                title="Editar"
              >
                <i className="material-icons">edit</i>
              </button>
              <button
                type="button"
                className="btn-flat waves-effect danger-text"
                onClick={() => onDelete(pedido)}
                title="Excluir"
              >
                <i className="material-icons">delete</i>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
