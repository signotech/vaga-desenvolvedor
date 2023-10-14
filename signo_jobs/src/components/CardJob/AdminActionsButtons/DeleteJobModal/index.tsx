import { Job } from "@/interfaces/Job";
import { fetchApi } from "@/utils/fetch";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import React, { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

function DeleteJobModal(props: Pick<Job, "id" | "title">) {
  const [modal, setModal] = useState(false);

  const { id, title } = props;
  const { token } = parseCookies();
  const router = useRouter();

  const toggle = () => setModal(!modal);

  function deleteJob() {
    fetchApi("/api/jobs/delete", {
      method: "DELETE",
      body: JSON.stringify({ id }),
      headers: {
        authorization: token,
      },
    }).then((res) => res.message && router.reload());
  }

  return (
    <div>
      <AiFillDelete color="red" onClick={toggle} />
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Deletar {title}</ModalHeader>
        <ModalBody>
          Você está prestes a excluir a vaga <b>{title}</b>, tem certeza disso?
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={deleteJob}>
            Sim, Excluir!
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default DeleteJobModal;
