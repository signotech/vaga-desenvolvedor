import { api } from '@/config/api.config';
import type { Cliente, ClienteInput } from '@/models/clientes/cliente.model';
import type { ListParams, PaginatedResponse } from '@/types/api-response.type';
import { toQueryParams } from '@/utils/query.util';

export const ClienteService = {
  async list(params: ListParams = {}): Promise<PaginatedResponse<Cliente>> {
    const { data } = await api.get<PaginatedResponse<Cliente>>('/clientes', {
      params: toQueryParams(params),
    });
    return data;
  },

  async getById(id: number): Promise<Cliente> {
    const { data } = await api.get<Cliente>(`/clientes/${id}`);
    return data;
  },

  async create(payload: ClienteInput): Promise<Cliente> {
    const { data } = await api.post<Cliente>('/clientes', payload);
    return data;
  },

  async update(id: number, payload: Partial<ClienteInput>): Promise<Cliente> {
    const { data } = await api.put<Cliente>(`/clientes/${id}`, payload);
    return data;
  },

  async remove(id: number): Promise<void> {
    await api.delete(`/clientes/${id}`);
  },

  async removeMany(ids: number[]): Promise<{ deleted: number }> {
    const { data } = await api.post<{ deleted: number }>('/clientes/bulk-delete', { ids });
    return data;
  },
};
