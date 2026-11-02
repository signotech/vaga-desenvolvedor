export type ListQuery = {
  page: number;
  pageSize: number;
  search?: string;
  filterField?: string;
  filterValue?: string;
  sortBy?: string;
  sortDirection: "asc" | "desc";
};

function normalize(value: unknown): string {
  const text = value instanceof Date ? value.toISOString() : String(value ?? "");
  return text
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLocaleLowerCase("pt-BR");
}

function compareValues(left: unknown, right: unknown): number {
  if (left instanceof Date && right instanceof Date) {
    return left.getTime() - right.getTime();
  }

  if (typeof left === "number" && typeof right === "number") {
    return left - right;
  }

  return normalize(left).localeCompare(normalize(right), "pt-BR", {
    numeric: true,
    sensitivity: "base",
  });
}

export function validateListQuery(
  query: ListQuery,
  fields: readonly string[],
): string | undefined {
  if (query.filterField && !fields.includes(query.filterField)) {
    return "Campo de filtro inválido.";
  }
  if (query.sortBy && !fields.includes(query.sortBy)) {
    return "Campo de ordenação inválido.";
  }
  return undefined;
}

export function paginateRows<T extends Record<string, unknown>>(
  source: T[],
  query: ListQuery,
  fields: readonly string[],
) {
  const search = normalize(query.search?.trim());
  const filterValue = normalize(query.filterValue?.trim());
  const filtered = source.filter((row) => {
    const matchesSearch =
      !search || fields.some((field) => normalize(row[field]).includes(search));
    const matchesFilter =
      !filterValue ||
      !query.filterField ||
      normalize(row[query.filterField]).includes(filterValue);
    return matchesSearch && matchesFilter;
  });

  const sortBy = query.sortBy || "id";
  const direction = query.sortDirection === "asc" ? 1 : -1;
  const sorted = [...filtered].sort(
    (left, right) => direction * compareValues(left[sortBy], right[sortBy]),
  );
  const offset = (query.page - 1) * query.pageSize;
  const totalCount = sorted.length;

  return {
    items: sorted.slice(offset, offset + query.pageSize),
    pagination: {
      totalCount,
      currentPage: query.page,
      pageSize: query.pageSize,
      totalPages: Math.ceil(totalCount / query.pageSize),
    },
  };
}
