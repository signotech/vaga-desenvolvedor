import { create } from 'zustand';
import { DEFAULT_PAGE_SIZE } from '@/constants/app/app.constants';
import type { SortOrder } from '@/types/api-response.type';

export type ClienteFilters = {
  q: string;
};

type ClienteUiState = {
  page: number;
  filters: ClienteFilters;
  appliedFilters: ClienteFilters;
  sortBy: string;
  sortOrder: SortOrder;
  limit: number;
  setPage: (page: number) => void;
  setFilters: (filters: Partial<ClienteFilters>) => void;
  applyFilters: () => void;
  setSort: (sortBy: string, sortOrder: SortOrder) => void;
  setLimit: (limit: number) => void;
};

const emptyFilters: ClienteFilters = { q: '' };

export const useClienteStore = create<ClienteUiState>((set, get) => ({
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
