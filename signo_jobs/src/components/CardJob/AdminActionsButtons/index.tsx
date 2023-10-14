import React from "react";
import { Job } from "@/interfaces/Job";
import styles from "./AdminActionsButtons.module.scss";
import DeleteJobModal from "./DeleteJobModal";
import PlayOrPauseModal from "./PlayOrPauseModal";
import EditJobModal from "./EditJobModal";
import ListOfCandidatesModal from "./ListOfCandidatesModal";

export default function AdminActionsButtons(props: Omit<Job, "user_id">) {
  const { status, title, id, candidates, salary, type, description } = props;
  return (
    <div className={styles.action_btns}>
      <DeleteJobModal title={title} id={id} />
      <PlayOrPauseModal status={status} id={id} title={title} />
      <EditJobModal
        id={id}
        title={title}
        description={description}
        salary={salary}
        type={type}
      />
      <ListOfCandidatesModal candidates={candidates} title={title} />
    </div>
  );
}
