import React, { useState } from "react";
import styles from "./ModalDeleteUser.module.scss";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  DropdownItem,
} from "reactstrap";
import { fetchApi } from "@/utils/fetch";
import { parseCookies } from "nookies";
import useLogout from "@/hooks/useLogout";

export default function ModalDeleteUser(props: {
  toggleModal: () => void;
  modal: boolean;
}) {
  const { token } = parseCookies();
  const { logout } = useLogout();

  const { toggleModal, modal } = props;

  function deleteAccount() {
    return fetchApi("/api/users/delete", {
      method: "DELETE",
      headers: {
        authorization: token,
      },
    }).then((res) => {
      if (res.message) logout();
    });
  }

  return (
    <div>
      <Modal isOpen={modal} centered toggle={toggleModal}>
        <ModalHeader>Deletar Conta</ModalHeader>
        <ModalBody>
          Você Está prestes a excluir sua conta, tem certeza disso?
        </ModalBody>
        <ModalFooter>
          <Button color="primary" type="button" onClick={deleteAccount}>
            Sim, Excluir!
          </Button>{" "}
          <Button color="secondary" onClick={toggleModal}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
