import axios from 'axios';
import type { ApiValidationError } from '@/types/api-response.type';

export function getErrorMessage(error: unknown, fallback = 'Ocorreu um erro inesperado'): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as ApiValidationError | undefined;
    if (data?.errors?.length) {
      return data.errors.map((item) => item.msg).join(', ');
    }
    if (data?.error) return data.error;
  }

  if (error instanceof Error) return error.message;
  return fallback;
}
