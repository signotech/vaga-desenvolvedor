import type { Candidate } from './candidate';
import type { Job } from './job';

export interface Application {
  id: number;
  candidateId: number;
  jobId: number;
  active: boolean;
  appliedAt: string;
  candidate?: Candidate;
  job?: Job;
}
