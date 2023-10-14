import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { BiUser } from "react-icons/bi";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

function LoginModal() {
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState<"login" | "register">("login");

  const toggle = () => {
    setModal(!modal);
    setForm("login");
  };
  const changeForm = () => {
    form === "login" ? setForm("register") : setForm("login");
  };

  return (
    <div>
      <BiUser onClick={toggle} />
      <Modal isOpen={modal} centered toggle={toggle}>
        <ModalHeader toggle={toggle}>
          {form === "login" ? "Login" : "Registrar"}
        </ModalHeader>
        {form === "login" && (
          <LoginForm toggle={toggle} changeForm={changeForm} />
        )}
        {form === "register" && (
          <RegisterForm changeForm={changeForm} toggle={toggle} />
        )}
      </Modal>
    </div>
  );
}

export default LoginModal;
