import type { Application } from './application';

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
