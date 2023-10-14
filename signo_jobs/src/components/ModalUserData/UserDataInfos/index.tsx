import { User } from "@/interfaces/User";
import React from "react";
import styles from "./UserDataInfos.module.scss";

export default function UserDataInfos(
  props: Pick<User, "name" | "email" | "role">
) {
  const { name, email, role } = props;
  return (
    <div className={styles.user_infos}>
      {name}
      <br />
      {email}
      <br />
      {role === "USER" ? "Candidato" : "Empregador"}
    </div>
  );
}
