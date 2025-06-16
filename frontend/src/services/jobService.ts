import type { Application } from "../types/application";
import { authService } from './authService';

export type ContractType = 'CLT' | 'PJ' | 'FREELANCER';

export interface Job {
  id: number;
  title: string;
  description: string;
  type: ContractType;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  applications?: Application[];
}

export interface CreateJobData {
  title: string;
  description: string;
  type: ContractType;
}

export interface UpdateJobData {
  title?: string;
  description?: string;
  type?: ContractType;
  active?: boolean;
}

export interface JobFilters {
  search?: string;
  type?: ContractType;
  active?: boolean;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

class JobService {
  private baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

  private getHeaders() {
    const token = authService.getToken();
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
    };
  }

  async getJobs(filters: JobFilters = {}) {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        params.append(key, value.toString());
      }
    });

    const response = await fetch(`${this.baseUrl}/jobs?${params}`, {
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch jobs');
    }

    return response.json();
  }

  async getJobById(id: number): Promise<Job> {
    const response = await fetch(`${this.baseUrl}/jobs/${id}`, {
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      throw new Error('Job not found');
    }

    return response.json();
  }

  async createJob(data: CreateJobData): Promise<Job> {
    const response = await fetch(`${this.baseUrl}/jobs`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create job');
    }

    return response.json();
  }

  async updateJob(id: number, data: UpdateJobData): Promise<Job> {
    const response = await fetch(`${this.baseUrl}/jobs/${id}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update job');
    }

    return response.json();
  }

  async deleteJob(id: number): Promise<void> {
    const response = await fetch(`${this.baseUrl}/jobs/${id}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to delete job');
    }
  }

  async deleteJobs(ids: number[]): Promise<void> {
    const response = await fetch(`${this.baseUrl}/jobs/bulk-delete`, {
      method: 'DELETE',
      headers: this.getHeaders(),
      body: JSON.stringify({ ids }),
    });

    if (!response.ok) {
      throw new Error('Failed to delete jobs');
    }
  }

  async toggleJobStatus(id: number): Promise<Job> {
    const response = await fetch(`${this.baseUrl}/jobs/${id}/toggle`, {
      method: 'PATCH',
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to toggle job status');
    }

    return response.json();
  }
}

export const jobService = new JobService();