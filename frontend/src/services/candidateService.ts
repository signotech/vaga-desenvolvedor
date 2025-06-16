import { authService } from './authService';
import type { Application } from '../types/application';

export interface Candidate {
  id: number;
  name: string;
  email: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
  applications?: Application[];
}

export interface CreateCandidateData {
  name: string;
  email: string;
  phone?: string;
}

export interface UpdateCandidateData {
  name?: string;
  email?: string;
  phone?: string;
}

export interface CandidateFilters {
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

class CandidateService {
  private baseUrl = process.env.NEXT_PUBLIC_API_URL|| 'http://localhost:3000';

  private getHeaders() {
    const token = authService.getToken();
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
    };
  }

  async getCandidates(filters: CandidateFilters = {}) {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        params.append(key, value.toString());
      }
    });

    const response = await fetch(`${this.baseUrl}/candidates?${params}`, {
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch candidates');
    }

    return response.json();
  }

  async getCandidateById(id: number): Promise<Candidate> {
    const response = await fetch(`${this.baseUrl}/candidates/${id}`, {
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      throw new Error('Candidate not found');
    }

    return response.json();
  }

  async createCandidate(data: CreateCandidateData): Promise<Candidate> {
    const response = await fetch(`${this.baseUrl}/candidates`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create candidate');
    }

    return response.json();
  }

  async updateCandidate(id: number, data: UpdateCandidateData): Promise<Candidate> {
    const response = await fetch(`${this.baseUrl}/candidates/${id}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update candidate');
    }

    return response.json();
  }

  async deleteCandidate(id: number): Promise<void> {
    const response = await fetch(`${this.baseUrl}/candidates/${id}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to delete candidate');
    }
  }

  async deleteCandidates(ids: number[]): Promise<void> {
    const response = await fetch(`${this.baseUrl}/candidates/bulk-delete`, {
      method: 'DELETE',
      headers: this.getHeaders(),
      body: JSON.stringify({ ids }),
    });

    if (!response.ok) {
      throw new Error('Failed to delete candidates');
    }
  }
}

export const candidateService = new CandidateService();