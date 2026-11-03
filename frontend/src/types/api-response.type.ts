export type PageMeta = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type PaginatedResponse<T> = {
  data: T[];
  meta: PageMeta;
};

export type SortOrder = 'ASC' | 'DESC';

export type ListParams = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: SortOrder;
} & Record<string, string | number | undefined>;

export type ApiValidationError = {
  errors?: Array<{ msg: string; path?: string }>;
  error?: string;
};
