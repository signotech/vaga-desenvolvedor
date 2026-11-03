import { api } from '@/config/api.config';
import type { Pedido, PedidoInput } from '@/models/pedidos/pedido.model';
import type { ListParams, PaginatedResponse } from '@/types/api-response.type';
import { toQueryParams } from '@/utils/query.util';

export const PedidoService = {
  async list(params: ListParams = {}): Promise<PaginatedResponse<Pedido>> {
    const { data } = await api.get<PaginatedResponse<Pedido>>('/pedidos', {
      params: toQueryParams(params),
    });
    return data;
  },

  async getById(id: number): Promise<Pedido> {
    const { data } = await api.get<Pedido>(`/pedidos/${id}`);
    return data;
  },

  async create(payload: PedidoInput): Promise<Pedido> {
    const { data } = await api.post<Pedido>('/pedidos', payload);
    return data;
  },

  async update(id: number, payload: Partial<PedidoInput>): Promise<Pedido> {
    const { data } = await api.put<Pedido>(`/pedidos/${id}`, payload);
    return data;
  },

  async remove(id: number): Promise<void> {
    await api.delete(`/pedidos/${id}`);
  },

  async removeMany(ids: number[]): Promise<{ deleted: number }> {
    const { data } = await api.post<{ deleted: number }>('/pedidos/bulk-delete', { ids });
    return data;
  },
};
