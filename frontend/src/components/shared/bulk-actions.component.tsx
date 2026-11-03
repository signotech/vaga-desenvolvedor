type BulkActionsProps = {
  count: number;
  onDelete: () => void;
};

export function BulkActionsComponent({ count, onDelete }: BulkActionsProps) {
  if (count === 0) return null;

  return (
    <div className="bulk-bar" role="status">
      <span>
        <strong>{count}</strong> selecionado{count > 1 ? 's' : ''}
      </span>
      <button type="button" className="btn-flat waves-effect danger-text" onClick={onDelete}>
        Excluir selecionados
      </button>
    </div>
  );
}
