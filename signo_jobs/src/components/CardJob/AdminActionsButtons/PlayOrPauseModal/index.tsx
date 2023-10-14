import { Job } from "@/interfaces/Job";
import { fetchApi } from "@/utils/fetch";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import React, { useState } from "react";
import { AiFillPauseCircle, AiFillPlayCircle } from "react-icons/ai";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

function PlayOrPauseModal(props: Pick<Job, "status" | "id" | "title">) {
  const [modal, setModal] = useState(false);
  const { status, title, id } = props;
  const { token } = parseCookies();
  const router = useRouter();

  const toggle = () => setModal(!modal);

  function pauseOrPlayJob() {
    fetchApi("/api/jobs/update/status", {
      method: "PUT",
      body: JSON.stringify({ id }),
      headers: {
        authorization: token,
      },
    }).then((res) => res.message && router.reload());
  }

  return (
    <div>
      {status === "JOB" && (
        <AiFillPauseCircle onClick={toggle} color="8a5204" />
      )}
      {status === "PAUSED" && (
        <AiFillPlayCircle onClick={toggle} color="green" />
      )}
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>{title}</ModalHeader>
        <ModalBody>
          Você está prestes a{" "}
          {status === "JOB" ? "pausar essa vaga" : "liberar o acesso a vaga"},
          tem certeza disso?
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={pauseOrPlayJob}>
            Sim, {status === "JOB" ? "Pausar Vaga" : "Liberar Acesso"}
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default PlayOrPauseModal;
