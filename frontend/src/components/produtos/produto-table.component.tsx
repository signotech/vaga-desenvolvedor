import {
  RowSelectCellComponent,
  RowSelectHeaderComponent,
} from '@/components/shared/row-select-cell.component';
import { SortableThComponent } from '@/components/shared/sortable-th.component';
import type { Produto } from '@/models/produtos/produto.model';
import type { SortOrder } from '@/types/api-response.type';
import { formatCurrency } from '@/utils/currency.util';

type ProdutoTableProps = {
  items: Produto[];
  highlightId?: number | null;
  sortBy: string;
  sortOrder: SortOrder;
  selectedIds: Set<number>;
  allSelected: boolean;
  someSelected: boolean;
  onToggleAll: () => void;
  onToggle: (id: number) => void;
  onSort: (field: string) => void;
  onEdit: (produto: Produto) => void;
  onDelete: (produto: Produto) => void;
};

export function ProdutoTableComponent({
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
}: ProdutoTableProps) {
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
          <SortableThComponent label="SKU" field="sku" sortBy={sortBy} sortOrder={sortOrder} onSort={onSort} />
          <SortableThComponent label="Título" field="titulo" sortBy={sortBy} sortOrder={sortOrder} onSort={onSort} />
          <SortableThComponent label="Preço" field="preco" sortBy={sortBy} sortOrder={sortOrder} onSort={onSort} />
          <SortableThComponent label="Estoque" field="estoque" sortBy={sortBy} sortOrder={sortOrder} onSort={onSort} />
          <th className="right-align">Ações</th>
        </tr>
      </thead>
      <tbody>
        {items.map((produto) => (
          <tr key={produto.id} className={highlightId === produto.id ? 'is-highlighted' : undefined}>
            <RowSelectCellComponent
              checked={selectedIds.has(produto.id)}
              onChange={() => onToggle(produto.id)}
              label={`Selecionar produto ${produto.id}`}
            />
            <td data-label="ID">{produto.id}</td>
            <td data-label="SKU">{produto.sku}</td>
            <td data-label="Título">{produto.titulo}</td>
            <td data-label="Preço">{formatCurrency(produto.preco)}</td>
            <td data-label="Estoque">{produto.estoque}</td>
            <td data-label="Ações" className="table-actions">
              <button
                type="button"
                className="btn-flat waves-effect"
                onClick={() => onEdit(produto)}
                title="Editar"
              >
                <i className="material-icons">edit</i>
              </button>
              <button
                type="button"
                className="btn-flat waves-effect danger-text"
                onClick={() => onDelete(produto)}
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
