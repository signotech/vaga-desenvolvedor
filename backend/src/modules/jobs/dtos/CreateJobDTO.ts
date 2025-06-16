export interface CreateJobDTO {
  title: string;
  description: string;
  type: 'CLT' | 'PJ' | 'FREELANCER';
}
