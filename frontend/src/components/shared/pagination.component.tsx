import type { PageMeta } from '@/types/api-response.type';

type PaginationProps = {
  meta: PageMeta;
  onPageChange: (page: number) => void;
};

function buildPageItems(current: number, totalPages: number): Array<number | 'ellipsis'> {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const items: Array<number | 'ellipsis'> = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(totalPages - 1, current + 1);

  if (start > 2) items.push('ellipsis');
  for (let page = start; page <= end; page += 1) items.push(page);
  if (end < totalPages - 1) items.push('ellipsis');
  items.push(totalPages);

  return items;
}

function ChevronLeftIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d="M8.75 3.5L5.25 7l3.5 3.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d="M5.25 3.5L8.75 7l-3.5 3.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PaginationComponent({ meta, onPageChange }: PaginationProps) {
  if (meta.total === 0) return null;

  const from = (meta.page - 1) * meta.limit + 1;
  const to = Math.min(meta.page * meta.limit, meta.total);
  const totalPages = Math.max(meta.totalPages, 1);
  const hasPrev = meta.page > 1;
  const hasNext = meta.page < totalPages;
  const pages = buildPageItems(meta.page, totalPages);

  return (
    <div className="pager" role="navigation" aria-label="Paginação">
      <p className="pager-summary">
        Exibindo <strong>{from}–{to}</strong> de <strong>{meta.total}</strong>
      </p>

      <div className="pager-controls">
        <button
          type="button"
          className="pager-nav"
          disabled={!hasPrev}
          onClick={() => {
            if (hasPrev) onPageChange(meta.page - 1);
          }}
        >
          <ChevronLeftIcon />
          Anterior
        </button>

        <div className="pager-pages" role="list">
          {pages.map((item, index) =>
            item === 'ellipsis' ? (
              <span key={`e-${index}`} className="pager-ellipsis" aria-hidden>
                …
              </span>
            ) : (
              <button
                key={item}
                type="button"
                role="listitem"
                className={`pager-page${item === meta.page ? ' is-active' : ''}`}
                aria-label={`Página ${item}`}
                aria-current={item === meta.page ? 'page' : undefined}
                onClick={() => onPageChange(item)}
              >
                {item}
              </button>
            ),
          )}
        </div>

        <button
          type="button"
          className="pager-nav"
          disabled={!hasNext}
          onClick={() => {
            if (hasNext) onPageChange(meta.page + 1);
          }}
        >
          Próxima
          <ChevronRightIcon />
        </button>
      </div>
    </div>
  );
}
