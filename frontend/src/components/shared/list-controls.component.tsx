import { PAGE_SIZE_OPTIONS } from '@/constants/app/app.constants';
import type { SortOrder } from '@/types/api-response.type';

type SortField = {
  value: string;
  label: string;
};

type ListControlsProps = {
  sortFields: readonly SortField[];
  sortBy: string;
  sortOrder: SortOrder;
  limit: number;
  onSortByChange: (value: string) => void;
  onSortOrderChange: (value: SortOrder) => void;
  onLimitChange: (value: number) => void;
};

export function ListControlsComponent({
  sortFields,
  sortBy,
  sortOrder,
  limit,
  onSortByChange,
  onSortOrderChange,
  onLimitChange,
}: ListControlsProps) {
  return (
    <div className="toolbar-meta">
      <div className="toolbar-sort-mobile">
        <label className="field">
          <span className="field-label">Ordenar</span>
          <select
            className="browser-default field-control"
            value={sortBy}
            onChange={(event) => onSortByChange(event.target.value)}
          >
            {sortFields.map((field) => (
              <option key={field.value} value={field.value}>
                {field.label}
              </option>
            ))}
          </select>
        </label>

        <label className="field field-compact">
          <span className="field-label">Direção</span>
          <select
            className="browser-default field-control"
            value={sortOrder}
            onChange={(event) => onSortOrderChange(event.target.value as SortOrder)}
          >
            <option value="ASC">Asc</option>
            <option value="DESC">Desc</option>
          </select>
        </label>
      </div>

      <label className="field field-compact">
        <span className="field-label">Por página</span>
        <select
          className="browser-default field-control"
          value={limit}
          onChange={(event) => onLimitChange(Number(event.target.value))}
        >
          {PAGE_SIZE_OPTIONS.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
