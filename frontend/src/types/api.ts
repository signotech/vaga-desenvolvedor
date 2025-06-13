export interface CreateApplicationData {
  candidateId: number;
  jobId: number;
}

export interface ApplicationFilters {
  candidateId?: number;
  jobId?: number;
  active?: boolean;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface Pagination<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
}
