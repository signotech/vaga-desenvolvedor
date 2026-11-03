import {
  RowSelectCellComponent,
  RowSelectHeaderComponent,
} from '@/components/shared/row-select-cell.component';
import { SortableThComponent } from '@/components/shared/sortable-th.component';
import type { Cliente } from '@/models/clientes/cliente.model';
import type { SortOrder } from '@/types/api-response.type';
import { formatCpf } from '@/utils/cpf.util';

type ClienteTableProps = {
  items: Cliente[];
  highlightId?: number | null;
  sortBy: string;
  sortOrder: SortOrder;
  selectedIds: Set<number>;
  allSelected: boolean;
  someSelected: boolean;
  onToggleAll: () => void;
  onToggle: (id: number) => void;
  onSort: (field: string) => void;
  onEdit: (cliente: Cliente) => void;
  onDelete: (cliente: Cliente) => void;
};

export function ClienteTableComponent({
  items,
  highlightId,
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
}: ClienteTableProps) {
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
          <SortableThComponent label="Nome" field="nome" sortBy={sortBy} sortOrder={sortOrder} onSort={onSort} />
          <SortableThComponent label="CPF" field="cpf" sortBy={sortBy} sortOrder={sortOrder} onSort={onSort} />
          <SortableThComponent label="E-mail" field="email" sortBy={sortBy} sortOrder={sortOrder} onSort={onSort} />
          <th className="right-align">Ações</th>
        </tr>
      </thead>
      <tbody>
        {items.map((cliente) => (
          <tr key={cliente.id} className={highlightId === cliente.id ? 'is-highlighted' : undefined}>
            <RowSelectCellComponent
              checked={selectedIds.has(cliente.id)}
              onChange={() => onToggle(cliente.id)}
              label={`Selecionar cliente ${cliente.id}`}
            />
            <td data-label="ID">{cliente.id}</td>
            <td data-label="Nome">{cliente.nome}</td>
            <td data-label="CPF">{formatCpf(cliente.cpf)}</td>
            <td data-label="E-mail">{cliente.email}</td>
            <td data-label="Ações" className="table-actions">
              <button
                type="button"
                className="btn-flat waves-effect"
                onClick={() => onEdit(cliente)}
                title="Editar"
              >
                <i className="material-icons">edit</i>
              </button>
              <button
                type="button"
                className="btn-flat waves-effect danger-text"
                onClick={() => onDelete(cliente)}
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
