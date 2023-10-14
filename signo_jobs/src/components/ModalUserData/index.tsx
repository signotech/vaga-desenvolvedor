import { User } from "@/interfaces/User";
import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import ModalDeleteUser from "../ModalDeleteUser";
import UserDataInfos from "./UserDataInfos";
import FormUserData from "./FormUserData";

export default function ModalUserData(props: {
  toggleModal: () => void;
  modal: boolean;
  userInfos: User;
}) {
  const [modalDelete, setModalDelete] = useState(false);
  const [editInfos, setEditInfos] = useState(false);

  const { toggleModal, modal, userInfos } = props;
  const toggleModalDelete = () => setModalDelete(!modalDelete);

  return (
    <div>
      <Modal isOpen={modal} centered toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>{userInfos.name}</ModalHeader>
        <ModalBody>
          {!editInfos && (
            <UserDataInfos
              role={userInfos.role}
              name={userInfos.name}
              email={userInfos.email}
            />
          )}
          {editInfos && <FormUserData userInfos={userInfos} />}
        </ModalBody>

        <ModalFooter>
          {!editInfos ? (
            <>
              <Button color="danger" type="button" onClick={toggleModalDelete}>
                Deletar Minha Conta!
              </Button>{" "}
              <Button
                color="primary"
                onClick={() => setEditInfos(true)}
                type="button"
              >
                Editar Dados
              </Button>{" "}
            </>
          ) : (
            <Button
              color="danger"
              onClick={() => setEditInfos(false)}
              type="button"
            >
              Cancelar
            </Button>
          )}
        </ModalFooter>
      </Modal>
      <ModalDeleteUser toggleModal={toggleModalDelete} modal={modalDelete} />
    </div>
  );
}
