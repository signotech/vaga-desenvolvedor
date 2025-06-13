import type { Candidate } from '../types/candidate'
import type { Job } from '../types/job'
import { authService } from './authService';

export interface Application {
  id: number;
  candidateId: number;
  jobId: number;
  active: boolean;
  appliedAt: string;
  candidate?: Candidate;
  job?: Job;
}

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

class ApplicationService {
  private baseUrl = process.env.VITE_API_URL || 'http://localhost:3000/api';

  private getHeaders() {
    const token = authService.getToken();
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
    };
  }

  async getApplications(filters: ApplicationFilters = {}) {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        params.append(key, value.toString());
      }
    });

    const response = await fetch(`${this.baseUrl}/applications?${params}`, {
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch applications');
    }

    return response.json();
  }

  async getApplicationById(id: number): Promise<Application> {
    const response = await fetch(`${this.baseUrl}/applications/${id}`, {
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      throw new Error('Application not found');
    }

    return response.json();
  }

  async createApplication(data: CreateApplicationData): Promise<Application> {
    const response = await fetch(`${this.baseUrl}/applications`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create application');
    }

    return response.json();
  }

  async toggleApplicationStatus(id: number): Promise<Application> {
    const response = await fetch(`${this.baseUrl}/applications/${id}/toggle`, {
      method: 'PATCH',
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to toggle application status');
    }

    return response.json();
  }

  async deleteApplication(id: number): Promise<void> {
    const response = await fetch(`${this.baseUrl}/applications/${id}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to delete application');
    }
  }

  async getApplicationsByCandidate(candidateId: number) {
    const response = await fetch(`${this.baseUrl}/candidates/${candidateId}/applications`, {
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch candidate applications');
    }

    return response.json();
  }

  async getApplicationsByJob(jobId: number) {
    const response = await fetch(`${this.baseUrl}/jobs/${jobId}/applications`, {
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch job applications');
    }

    return response.json();
  }

  async checkExistingApplication(candidateId: number, jobId: number): Promise<boolean> {
    try {
      const response = await fetch(
        `${this.baseUrl}/applications/check?candidateId=${candidateId}&jobId=${jobId}`,
        { headers: this.getHeaders() }
      );

      if (!response.ok) return false;

      const { exists } = await response.json();
      return exists;
    } catch {
      return false;
    }
  }
}

export const applicationService = new ApplicationService();