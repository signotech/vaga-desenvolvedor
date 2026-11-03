import type { SortOrder } from '@/types/api-response.type';

type SortableThProps = {
  label: string;
  field: string;
  sortBy: string;
  sortOrder: SortOrder;
  onSort: (field: string) => void;
  className?: string;
};

export function SortableThComponent({
  label,
  field,
  sortBy,
  sortOrder,
  onSort,
  className,
}: SortableThProps) {
  const active = sortBy === field;

  return (
    <th className={['th-sortable', className, active ? 'is-sorted' : ''].filter(Boolean).join(' ')}>
      <button
        type="button"
        className="th-sort-btn"
        onClick={() => onSort(field)}
        aria-label={`Ordenar por ${label}`}
      >
        <span>{label}</span>
        <span className="th-sort-icon" aria-hidden>
          {active ? (sortOrder === 'ASC' ? '↑' : '↓') : '↕'}
        </span>
      </button>
    </th>
  );
}
