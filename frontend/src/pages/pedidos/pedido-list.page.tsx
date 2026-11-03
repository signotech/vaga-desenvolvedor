import { useMemo, useState } from 'react';
import M from 'materialize-css';
import { PedidoFiltersComponent } from '@/components/pedidos/pedido-filters.component';
import { PedidoFormModalComponent } from '@/components/pedidos/pedido-form-modal.component';
import { PedidoTableComponent } from '@/components/pedidos/pedido-table.component';
import { BulkActionsComponent } from '@/components/shared/bulk-actions.component';
import { ConfirmModalComponent } from '@/components/shared/confirm-modal.component';
import { EmptyStateComponent } from '@/components/shared/empty-state.component';
import { ListControlsComponent } from '@/components/shared/list-controls.component';
import { LoadingStateComponent } from '@/components/shared/loading-state.component';
import { PageHeaderComponent } from '@/components/shared/page-header.component';
import { PaginationComponent } from '@/components/shared/pagination.component';
import { PEDIDO_LABELS, PEDIDO_SORT_FIELDS } from '@/constants/pedidos/pedido.constants';
import { usePedidoList } from '@/hooks/pedidos/use-pedido-list.hook';
import { useSelection } from '@/hooks/shared/use-selection.hook';
import type { Pedido, PedidoStatus } from '@/models/pedidos/pedido.model';
import { openModal } from '@/utils/modal.util';

export function PedidoListPage() {
  const {
    items,
    meta,
    loading,
    error,
    filters,
    sortBy,
    sortOrder,
    limit,
    clientes,
    produtos,
    setFilters,
    search,
    changePage,
    changeSort,
    changeLimit,
    save,
    remove,
    removeMany,
  } = usePedidoList();

  const itemIds = useMemo(() => items.map((item) => item.id), [items]);
  const selection = useSelection(itemIds);
  const [selected, setSelected] = useState<Pedido | null>(null);
  const [pendingDelete, setPendingDelete] = useState<Pedido | null>(null);
  const [pendingBulk, setPendingBulk] = useState(false);

  return (
    <section className="fade-up">
      <PageHeaderComponent
        title={PEDIDO_LABELS.title}
        subtitle={PEDIDO_LABELS.subtitle}
        actionLabel={PEDIDO_LABELS.create}
        onAction={() => {
          setSelected(null);
          openModal('pedido-form-modal');
        }}
      />

      <div className="surface-card fade-up fade-up-delay-1">
        <div className="toolbar">
          <PedidoFiltersComponent
            status={filters.status}
            cliente={filters.cliente}
            onChange={(field, value) => {
              if (field === 'status') {
                setFilters({ status: value as PedidoStatus | '' });
                return;
              }
              setFilters({ cliente: value });
            }}
            onSearch={search}
          />
          <ListControlsComponent
            sortFields={PEDIDO_SORT_FIELDS}
            sortBy={sortBy}
            sortOrder={sortOrder}
            limit={limit}
            onSortByChange={(value) => changeSort(value, sortOrder)}
            onSortOrderChange={(value) => changeSort(sortBy, value)}
            onLimitChange={changeLimit}
          />
        </div>

        <BulkActionsComponent
          count={selection.selectedIds.length}
          onDelete={() => {
            setPendingBulk(true);
            openModal('pedido-bulk-delete-modal');
          }}
        />

        {error ? <p className="red-text">{error}</p> : null}
        {loading ? <LoadingStateComponent /> : null}
        {!loading && items.length === 0 ? <EmptyStateComponent message={PEDIDO_LABELS.empty} /> : null}
        {!loading && items.length > 0 ? (
          <>
            <PedidoTableComponent
              items={items}
              sortBy={sortBy}
              sortOrder={sortOrder}
              selectedIds={selection.selectedSet}
              allSelected={selection.allSelected}
              someSelected={selection.someSelected}
              onToggleAll={selection.toggleAll}
              onToggle={selection.toggle}
              onSort={(field) => {
                changeSort(field, sortBy === field && sortOrder === 'ASC' ? 'DESC' : 'ASC');
              }}
              onEdit={(pedido) => {
                setSelected(pedido);
                openModal('pedido-form-modal');
              }}
              onDelete={(pedido) => {
                setPendingDelete(pedido);
                openModal('pedido-delete-modal');
              }}
            />
            <PaginationComponent meta={meta} onPageChange={changePage} />
          </>
        ) : null}
      </div>

      <PedidoFormModalComponent
        id="pedido-form-modal"
        pedido={selected}
        clientes={clientes}
        produtos={produtos}
        onSubmit={async (payload) => {
          const result = await save(payload, selected?.id);
          if (!result.ok) return result.message;
          M.toast({ html: selected ? 'Pedido atualizado' : 'Pedido criado', classes: 'rounded' });
          return null;
        }}
      />

      <ConfirmModalComponent
        id="pedido-delete-modal"
        title="Excluir pedido"
        message={`Tem certeza que deseja excluir o pedido #${pendingDelete?.id ?? ''}?`}
        onConfirm={async () => {
          if (!pendingDelete) return;
          const result = await remove(pendingDelete.id);
          if (!result.ok) {
            M.toast({ html: result.message, classes: 'rounded red' });
            return;
          }
          M.toast({ html: 'Pedido excluído', classes: 'rounded' });
          setPendingDelete(null);
        }}
      />

      <ConfirmModalComponent
        id="pedido-bulk-delete-modal"
        title="Excluir pedidos"
        message={`Tem certeza que deseja excluir ${selection.selectedIds.length} pedido(s)?`}
        onConfirm={async () => {
          if (!pendingBulk || selection.selectedIds.length === 0) return;
          const result = await removeMany(selection.selectedIds);
          if (!result.ok) {
            M.toast({ html: result.message, classes: 'rounded red' });
            return;
          }
          M.toast({ html: 'Pedidos excluídos', classes: 'rounded' });
          selection.clear();
          setPendingBulk(false);
        }}
      />
    </section>
  );
}
