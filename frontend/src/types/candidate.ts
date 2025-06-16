import type { Application } from './application';

export interface Candidate {
  id: number;
  name: string;
  email: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
  applications?: Application[];
}
