import { useMemo, useState } from 'react';
import M from 'materialize-css';
import { ProdutoFiltersComponent } from '@/components/produtos/produto-filters.component';
import { ProdutoFormModalComponent } from '@/components/produtos/produto-form-modal.component';
import { ProdutoTableComponent } from '@/components/produtos/produto-table.component';
import { BulkActionsComponent } from '@/components/shared/bulk-actions.component';
import { ConfirmModalComponent } from '@/components/shared/confirm-modal.component';
import { EmptyStateComponent } from '@/components/shared/empty-state.component';
import { ListControlsComponent } from '@/components/shared/list-controls.component';
import { LoadingStateComponent } from '@/components/shared/loading-state.component';
import { PageHeaderComponent } from '@/components/shared/page-header.component';
import { PaginationComponent } from '@/components/shared/pagination.component';
import { PRODUTO_LABELS, PRODUTO_SORT_FIELDS } from '@/constants/produtos/produto.constants';
import { useProdutoList } from '@/hooks/produtos/use-produto-list.hook';
import { useHighlight } from '@/hooks/shared/use-highlight.hook';
import { useSelection } from '@/hooks/shared/use-selection.hook';
import type { Produto } from '@/models/produtos/produto.model';
import { openModal } from '@/utils/modal.util';

export function ProdutoListPage() {
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
  } = useProdutoList();

  const highlightId = useHighlight();
  const itemIds = useMemo(() => items.map((item) => item.id), [items]);
  const selection = useSelection(itemIds);
  const [selected, setSelected] = useState<Produto | null>(null);
  const [pendingDelete, setPendingDelete] = useState<Produto | null>(null);
  const [pendingBulk, setPendingBulk] = useState(false);

  return (
    <section className="fade-up">
      <PageHeaderComponent
        title={PRODUTO_LABELS.title}
        subtitle={PRODUTO_LABELS.subtitle}
        actionLabel={PRODUTO_LABELS.create}
        onAction={() => {
          setSelected(null);
          openModal('produto-form-modal');
        }}
      />

      <div className="surface-card fade-up fade-up-delay-1">
        <div className="toolbar">
          <ProdutoFiltersComponent
            sku={filters.sku}
            titulo={filters.titulo}
            onChange={(field, value) => setFilters({ [field]: value })}
            onSearch={search}
          />
          <ListControlsComponent
            sortFields={PRODUTO_SORT_FIELDS}
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
            openModal('produto-bulk-delete-modal');
          }}
        />

        {error ? <p className="red-text">{error}</p> : null}
        {loading ? <LoadingStateComponent /> : null}
        {!loading && items.length === 0 ? <EmptyStateComponent message={PRODUTO_LABELS.empty} /> : null}
        {!loading && items.length > 0 ? (
          <>
            <ProdutoTableComponent
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
              onEdit={(produto) => {
                setSelected(produto);
                openModal('produto-form-modal');
              }}
              onDelete={(produto) => {
                setPendingDelete(produto);
                openModal('produto-delete-modal');
              }}
            />
            <PaginationComponent meta={meta} onPageChange={changePage} />
          </>
        ) : null}
      </div>

      <ProdutoFormModalComponent
        id="produto-form-modal"
        produto={selected}
        onSubmit={async (payload) => {
          const result = await save(payload, selected?.id);
          if (!result.ok) return result.message;
          M.toast({ html: selected ? 'Produto atualizado' : 'Produto criado', classes: 'rounded' });
          return null;
        }}
      />

      <ConfirmModalComponent
        id="produto-delete-modal"
        title="Excluir produto"
        message={`Tem certeza que deseja excluir ${pendingDelete?.titulo ?? 'este produto'}?`}
        onConfirm={async () => {
          if (!pendingDelete) return;
          const result = await remove(pendingDelete.id);
          if (!result.ok) {
            M.toast({ html: result.message, classes: 'rounded red' });
            return;
          }
          M.toast({ html: 'Produto excluído', classes: 'rounded' });
          setPendingDelete(null);
        }}
      />

      <ConfirmModalComponent
        id="produto-bulk-delete-modal"
        title="Excluir produtos"
        message={`Tem certeza que deseja excluir ${selection.selectedIds.length} produto(s)?`}
        onConfirm={async () => {
          if (!pendingBulk || selection.selectedIds.length === 0) return;
          const result = await removeMany(selection.selectedIds);
          if (!result.ok) {
            M.toast({ html: result.message, classes: 'rounded red' });
            return;
          }
          M.toast({ html: 'Produtos excluídos', classes: 'rounded' });
          selection.clear();
          setPendingBulk(false);
        }}
      />
    </section>
  );
}
