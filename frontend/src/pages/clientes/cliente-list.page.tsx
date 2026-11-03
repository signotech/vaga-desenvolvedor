import { useMemo, useState } from 'react';
import M from 'materialize-css';
import { ClienteFiltersComponent } from '@/components/clientes/cliente-filters.component';
import { ClienteFormModalComponent } from '@/components/clientes/cliente-form-modal.component';
import { ClienteTableComponent } from '@/components/clientes/cliente-table.component';
import { BulkActionsComponent } from '@/components/shared/bulk-actions.component';
import { ConfirmModalComponent } from '@/components/shared/confirm-modal.component';
import { EmptyStateComponent } from '@/components/shared/empty-state.component';
import { ListControlsComponent } from '@/components/shared/list-controls.component';
import { LoadingStateComponent } from '@/components/shared/loading-state.component';
import { PageHeaderComponent } from '@/components/shared/page-header.component';
import { PaginationComponent } from '@/components/shared/pagination.component';
import { CLIENTE_LABELS, CLIENTE_SORT_FIELDS } from '@/constants/clientes/cliente.constants';
import { useClienteList } from '@/hooks/clientes/use-cliente-list.hook';
import { useHighlight } from '@/hooks/shared/use-highlight.hook';
import { useSelection } from '@/hooks/shared/use-selection.hook';
import type { Cliente } from '@/models/clientes/cliente.model';
import { openModal } from '@/utils/modal.util';

export function ClienteListPage() {
  const {
    items,
    meta,
    loading,
    error,
    filters,
    sortBy,
    sortOrder,
    limit,
    setFilters,
    search,
    changePage,
    changeSort,
    changeLimit,
    save,
    remove,
    removeMany,
  } = useClienteList();

  const highlightId = useHighlight();
  const itemIds = useMemo(() => items.map((item) => item.id), [items]);
  const selection = useSelection(itemIds);
  const [selected, setSelected] = useState<Cliente | null>(null);
  const [pendingDelete, setPendingDelete] = useState<Cliente | null>(null);
  const [pendingBulk, setPendingBulk] = useState(false);

  return (
    <section className="fade-up">
      <PageHeaderComponent
        title={CLIENTE_LABELS.title}
        subtitle={CLIENTE_LABELS.subtitle}
        actionLabel={CLIENTE_LABELS.create}
        onAction={() => {
          setSelected(null);
          openModal('cliente-form-modal');
        }}
      />

      <div className="surface-card fade-up fade-up-delay-1">
        <div className="toolbar">
          <ClienteFiltersComponent
            q={filters.q}
            onChange={(value) => setFilters({ q: value })}
            onSearch={search}
          />
          <ListControlsComponent
            sortFields={CLIENTE_SORT_FIELDS}
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
            openModal('cliente-bulk-delete-modal');
          }}
        />

        {error ? <p className="red-text">{error}</p> : null}
        {loading ? <LoadingStateComponent /> : null}
        {!loading && items.length === 0 ? <EmptyStateComponent message={CLIENTE_LABELS.empty} /> : null}
        {!loading && items.length > 0 ? (
          <>
            <ClienteTableComponent
              items={items}
              highlightId={highlightId}
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
              onEdit={(cliente) => {
                setSelected(cliente);
                openModal('cliente-form-modal');
              }}
              onDelete={(cliente) => {
                setPendingDelete(cliente);
                openModal('cliente-delete-modal');
              }}
            />
            <PaginationComponent meta={meta} onPageChange={changePage} />
          </>
        ) : null}
      </div>

      <ClienteFormModalComponent
        id="cliente-form-modal"
        cliente={selected}
        onSubmit={async (payload) => {
          const result = await save(payload, selected?.id);
          if (!result.ok) return result.message;
          M.toast({ html: selected ? 'Cliente atualizado' : 'Cliente criado', classes: 'rounded' });
          return null;
        }}
      />

      <ConfirmModalComponent
        id="cliente-delete-modal"
        title="Excluir cliente"
        message={`Tem certeza que deseja excluir ${pendingDelete?.nome ?? 'este cliente'}?`}
        onConfirm={async () => {
          if (!pendingDelete) return;
          const result = await remove(pendingDelete.id);
          if (!result.ok) {
            M.toast({ html: result.message, classes: 'rounded red' });
            return;
          }
          M.toast({ html: 'Cliente excluído', classes: 'rounded' });
          setPendingDelete(null);
        }}
      />

      <ConfirmModalComponent
        id="cliente-bulk-delete-modal"
        title="Excluir clientes"
        message={`Tem certeza que deseja excluir ${selection.selectedIds.length} cliente(s)?`}
        onConfirm={async () => {
          if (!pendingBulk || selection.selectedIds.length === 0) return;
          const result = await removeMany(selection.selectedIds);
          if (!result.ok) {
            M.toast({ html: result.message, classes: 'rounded red' });
            return;
          }
          M.toast({ html: 'Clientes excluídos', classes: 'rounded' });
          selection.clear();
          setPendingBulk(false);
        }}
      />
    </section>
  );
}
