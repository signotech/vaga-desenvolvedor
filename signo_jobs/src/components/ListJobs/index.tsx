import React from "react";
import CardJob from "../CardJob";
import { Job } from "@/interfaces/Job";
import styles from "./ListJobs.module.scss";
import { ListJobsProps } from "@/interfaces/ListJobsProps";
import AdminNewJobModal from "../AdminNewJobModal";
import { useRouter } from "next/router";

export default function ListJobs(props: ListJobsProps) {
  const {
    setSearch,
    search,
    setOrderBy,
    orderBy,
    jobs,
    userJobs,
    role,
    setPage,
    page,
    qtyPages,
    setItemsPerPage,
    itemsPerPage,
    title,
  } = props;

  const router = useRouter();

  return (
    <>
      <div className={styles.div_search_filter}>
        <div className={styles.search}>
          <input
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            placeholder="Pesquisar vagas..."
          />
        </div>
        <label>
          Ordenar Por:{" "}
          <select onChange={(e) => setOrderBy(e.target.value)} value={orderBy}>
            <option value=""></option>
            <option value="title">Titulo</option>
            <option value="description">Descrição</option>
            <option value="type">Tipo</option>
            <option value="salary">Salário</option>
            {role === "ADMIN" && router.route === "/my_jobs" && (
              <option value="status">Status</option>
            )}
          </select>
        </label>
      </div>
      {role === "ADMIN" && <AdminNewJobModal />}
      <hr />
      {title && <h1 className="text-white text-center">{title}</h1>}

      {jobs.map((job: Job) => (
        <CardJob
          jobs={userJobs}
          role={role}
          key={job.id}
          id={job.id}
          user_id={job.user_id}
          title={job.title}
          description={job.description}
          salary={job.salary}
          type={job.type}
          status={job.status}
          candidates={job.candidates}
        />
      ))}
      {jobs.length == 0 && (
        <div className={styles.no_jobs_div}>
          <h1 className="text-white text-center">Nada por aqui ainda!</h1>
        </div>
      )}
      {jobs.length > 0 && (
        <div className={styles.list_pagination}>
          <label>
            Página:{" "}
            <select
              onChange={(e) => setPage(parseInt(e.target.value))}
              value={page}
            >
              {Array.from({ length: qtyPages }, (_, index) => (
                <option key={index}>{index + 1}</option>
              ))}
            </select>
          </label>
          <label>
            Items por página:{" "}
            <select
              onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
              value={itemsPerPage}
            >
              <option>20</option>
              <option>40</option>
              <option>80</option>
              <option>100</option>
            </select>
          </label>
        </div>
      )}
    </>
  );
}
