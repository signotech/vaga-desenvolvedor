export interface Job {
  id: number;
  user_id: number;
  title: string;
  description: string;
  salary: string;
  type: "CLT" | "PJ" | "FREELANCER";
  status: "PAUSED" | "JOB";
  candidates: string[];
}
