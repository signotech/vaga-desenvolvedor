import { api } from '@/config/api.config';
import type { Produto, ProdutoInput } from '@/models/produtos/produto.model';
import type { ListParams, PaginatedResponse } from '@/types/api-response.type';
import { toQueryParams } from '@/utils/query.util';

export const ProdutoService = {
  async list(params: ListParams = {}): Promise<PaginatedResponse<Produto>> {
    const { data } = await api.get<PaginatedResponse<Produto>>('/produtos', {
      params: toQueryParams(params),
    });
    return data;
  },

  async getById(id: number): Promise<Produto> {
    const { data } = await api.get<Produto>(`/produtos/${id}`);
    return data;
  },

  async create(payload: ProdutoInput): Promise<Produto> {
    const { data } = await api.post<Produto>('/produtos', payload);
    return data;
  },

  async update(id: number, payload: Partial<ProdutoInput>): Promise<Produto> {
    const { data } = await api.put<Produto>(`/produtos/${id}`, payload);
    return data;
  },

  async remove(id: number): Promise<void> {
    await api.delete(`/produtos/${id}`);
  },

  async removeMany(ids: number[]): Promise<{ deleted: number }> {
    const { data } = await api.post<{ deleted: number }>('/produtos/bulk-delete', { ids });
    return data;
  },
};
