import { create } from 'zustand';
import { DEFAULT_PAGE_SIZE } from '@/constants/app/app.constants';
import type { PedidoStatus } from '@/models/pedidos/pedido.model';
import type { SortOrder } from '@/types/api-response.type';

export type PedidoFilters = {
  status: PedidoStatus | '';
  cliente: string;
};

type PedidoUiState = {
  page: number;
  filters: PedidoFilters;
  appliedFilters: PedidoFilters;
  sortBy: string;
  sortOrder: SortOrder;
  limit: number;
  setPage: (page: number) => void;
  setFilters: (filters: Partial<PedidoFilters>) => void;
  applyFilters: () => void;
  setSort: (sortBy: string, sortOrder: SortOrder) => void;
  setLimit: (limit: number) => void;
};

const emptyFilters: PedidoFilters = { status: '', cliente: '' };

export const usePedidoStore = create<PedidoUiState>((set, get) => ({
  page: 1,
  filters: emptyFilters,
  appliedFilters: emptyFilters,
  sortBy: 'id',
  sortOrder: 'DESC',
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
