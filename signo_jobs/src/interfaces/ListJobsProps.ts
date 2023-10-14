import { SetStateAction } from "react";
import { Job } from "./Job";

export interface ListJobsProps {
  setSearch: SetStateAction<any>;
  search: string;
  setOrderBy: SetStateAction<any>;
  orderBy: string;
  jobs: Job[];
  userJobs: string[];
  role: string;
  setPage: SetStateAction<any>;
  page: number;
  qtyPages: number;
  setItemsPerPage: SetStateAction<any>;
  itemsPerPage: number;
  title?: string;
}
