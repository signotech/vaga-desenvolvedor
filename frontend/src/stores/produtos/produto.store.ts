import { create } from 'zustand';
import { DEFAULT_PAGE_SIZE } from '@/constants/app/app.constants';
import type { SortOrder } from '@/types/api-response.type';

export type ProdutoFilters = {
  sku: string;
  titulo: string;
};

type ProdutoUiState = {
  page: number;
  filters: ProdutoFilters;
  appliedFilters: ProdutoFilters;
  sortBy: string;
  sortOrder: SortOrder;
  limit: number;
  setPage: (page: number) => void;
  setFilters: (filters: Partial<ProdutoFilters>) => void;
  applyFilters: () => void;
  setSort: (sortBy: string, sortOrder: SortOrder) => void;
  setLimit: (limit: number) => void;
};

const emptyFilters: ProdutoFilters = { sku: '', titulo: '' };

export const useProdutoStore = create<ProdutoUiState>((set, get) => ({
  page: 1,
  filters: emptyFilters,
  appliedFilters: emptyFilters,
  sortBy: 'id',
  sortOrder: 'ASC',
  limit: DEFAULT_PAGE_SIZE,

  setPage(page) {
    set({ page });
  },

  setFilters(filters) {
    set((state) => ({ filters: { ...state.filters, ...filters } }));
  },

  applyFilters() {
    set({ appliedFilters: get().filters, page: 1 });
  },

  setSort(sortBy, sortOrder) {
    set({ sortBy, sortOrder, page: 1 });
  },

  setLimit(limit) {
    set({ limit, page: 1 });
  },
}));
