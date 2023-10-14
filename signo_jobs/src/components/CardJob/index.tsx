import React from "react";
import styles from "./CardJob.module.scss";
import { Job } from "@/interfaces/Job";
import AdminActionsButtons from "./AdminActionsButtons";
import useCandidature from "@/hooks/useCandidature";

type CardJobProps = Job & { role: string; jobs: string[] };

export default function CardJob(props: CardJobProps) {
  const {
    title,
    description,
    salary,
    type,
    role,
    jobs,
    id,
    status,
    candidates,
  } = props;
  const idJob = id.toString();

  const { getJob, leaveJob, token } = useCandidature(id);

  return (
    <div className={styles.card_job}>
      <div className={styles.type}>
        <span>{type}</span>
      </div>
      <h1>{title}</h1>
      <TextWithLineBreaks text={description} />
      <p className={styles.salary}>
        {salary && <>R${parseFloat(salary).toFixed(2)}</>}
      </p>
      <div className={styles.action_buttons}>
        {role === "USER" && !jobs.includes(idJob) && (
          <button onClick={getJob}>Candidatar-se</button>
        )}
        {role === "USER" && jobs.includes(idJob) && (
          <button onClick={leaveJob}>Desistir da Candidatura</button>
        )}
        {role === "ADMIN" && jobs.includes(idJob) && (
          <AdminActionsButtons
            title={title}
            status={status}
            id={id}
            candidates={candidates}
            description={description}
            salary={salary}
            type={type}
          />
        )}
      </div>
      {role === "" && title && !token && (
        <p className="text-center fw-bold">
          Faça login para poder se cadastrar nas vagas!
        </p>
      )}
    </div>
  );
}

function TextWithLineBreaks({ text }: { text: string }) {
  const renderTextWithBreaks = () => {
    const textWithBreaks = text.replace(/\n/g, "<br>");
    return <p dangerouslySetInnerHTML={{ __html: textWithBreaks }} />;
  };

  return <>{renderTextWithBreaks()}</>;
}
