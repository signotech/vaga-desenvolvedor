'use strict';

const DEFAULT_PER_PAGE = 20;
const PER_PAGE_OPTIONS = [10, 20, 50, 100];

/**
 * Lê page/per_page da query string, aplicando limites seguros.
 */
function parsePagination(query = {}) {
  const page = Math.max(Number.parseInt(query.page, 10) || 1, 1);
  const requestedPerPage = Number.parseInt(query.per_page, 10);
  const perPage =
    Number.isInteger(requestedPerPage) && requestedPerPage > 0
      ? Math.min(requestedPerPage, 100)
      : DEFAULT_PER_PAGE;

  return {
    page,
    perPage,
    offset: (page - 1) * perPage,
  };
}

/**
 * Monta os metadados de paginação usados pela view.
 */
function buildPagination({ page, perPage, total }) {
  const lastPage = Math.max(Math.ceil(total / perPage), 1);
  const currentPage = Math.min(Math.max(page, 1), lastPage);

  return {
    page: currentPage,
    perPage,
    total,
    lastPage,
    from: total === 0 ? 0 : (currentPage - 1) * perPage + 1,
    to: Math.min(currentPage * perPage, total),
    hasPrevious: currentPage > 1,
    hasNext: currentPage < lastPage,
  };
}

/**
 * Gera a lista de páginas exibidas no componente de paginação,
 * usando "..." para encurtar intervalos grandes.
 */
function pageRange(current, last, delta = 1) {
  const pages = [];
  const start = Math.max(1, current - delta);
  const end = Math.min(last, current + delta);

  if (start > 1) {
    pages.push(1);

    if (start > 2) {
      pages.push('...');
    }
  }

  for (let page = start; page <= end; page += 1) {
    pages.push(page);
  }

  if (end < last) {
    if (end < last - 1) {
      pages.push('...');
    }

    pages.push(last);
  }

  return pages;
}

module.exports = {
  DEFAULT_PER_PAGE,
  PER_PAGE_OPTIONS,
  parsePagination,
  buildPagination,
  pageRange,
};
