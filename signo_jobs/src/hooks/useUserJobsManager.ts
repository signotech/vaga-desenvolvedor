import { Job } from "@/interfaces/Job";
import { User } from "@/interfaces/User";
import { fetchApi } from "@/utils/fetch";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { useState } from "react";

export default function useUserJobsManager() {
  const [jobs, setJobs] = useState([]);
  const [qtyPages, setQtyPages] = useState(0);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [orderBy, setOrderBy] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [role, setRole] = useState("");
  const [userJobs, setUserJobs] = useState<string[]>([]);
  const { token } = parseCookies();

  function fetchMyJobs() {
    return fetchApi(
      `/api/users/my_jobs?page=${page}&limit=${itemsPerPage}&order=${orderBy}&search=${search}`,
      {
        headers: {
          authorization: token,
        },
      }
    )
      .then(paginationLogic)
      .finally(() => setLoading(false));
  }

  function fetchAllJobs() {
    token &&
      fetchApi("/api/auth/get_user_infos", {
        method: "GET",
        headers: {
          authorization: token,
        },
      }).then(setRoleAndUserJobs);

    return fetchApi(
      `/api/jobs?page=${page}&limit=${itemsPerPage}&order=${orderBy}&search=${search}`
    )
      .then(paginationLogic)
      .finally(() => setLoading(false));
  }

  function fetchFirstUserInfos() {
    fetchApi("/api/auth/get_user_infos", {
      method: "GET",
      headers: {
        authorization: token,
      },
    })
      .then(setRoleAndUserJobs)
      .finally(() => fetchMyJobs());
  }

  function setRoleAndUserJobs(res: { data: User; message: string }) {
    if (res.message) {
      setRole(res.data.role);
      setUserJobs(res.data.jobs);
    }
  }

  function paginationLogic(res: {
    data: {
      jobs: any;
      qty: number;
    };
  }) {
    setJobs(res.data.jobs);
    let pagesQTY = res.data.qty / itemsPerPage;
    pagesQTY = pagesQTY < 1 ? 1 : pagesQTY;
    setQtyPages(pagesQTY);
  }

  return {
    fetchAllJobs,
    fetchFirstUserInfos,
    token,
    loading,
    jobs,
    userJobs,
    role,
    qtyPages,
    setPage,
    page,
    setSearch,
    search,
    setOrderBy,
    orderBy,
    setItemsPerPage,
    itemsPerPage,
  };
}
