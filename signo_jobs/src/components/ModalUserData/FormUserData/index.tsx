import useEditUserData from "@/hooks/useEditUserData";
import { User } from "@/interfaces/User";
import { fetchApi } from "@/utils/fetch";
import { parseCookies } from "nookies";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Alert,
  Button,
} from "reactstrap";

export default function FormUserData(props: { userInfos: User }) {
  const { userInfos } = props;
  const {
    passwordBlockCheckLogic,
    modifyData,
    success,
    error,
    toggleAccordion,
    open,
    clearMessages,
    setName,
    name,
    setPassword,
    password,
    setPasswordConfirm,
    passwordConfirm,
  } = useEditUserData();

  useEffect(() => {
    setName(userInfos.name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <Accordion open={open as string} toggle={toggleAccordion}>
        <AccordionItem>
          <AccordionHeader targetId="1">
            <h5>Mudar Dados</h5>
          </AccordionHeader>
          <AccordionBody accordionId="1">
            {success && <Alert color="success">Alterado com sucesso!</Alert>}
            {error && <Alert color="danger">{error}</Alert>}
            <label>
              Nome:
              <input
                type="text"
                onFocus={clearMessages}
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label>
              Email:
              <input readOnly disabled value={userInfos.email} />
              <p className="error-message">Não permitido modificar email!</p>
            </label>
            <div>
              {userInfos.name != name && !success && (
                <Button color="success" onClick={() => modifyData({ name })}>
                  Salvar Dados
                </Button>
              )}
            </div>
          </AccordionBody>
        </AccordionItem>
        <AccordionItem>
          <AccordionHeader targetId="2">
            <h5>Mudar Senha</h5>
          </AccordionHeader>
          <AccordionBody accordionId="2">
            {success && <Alert color="success">Alterado com sucesso!</Alert>}
            {error && <Alert color="danger">{error}</Alert>}
            <label>
              Nova senha:
              <input
                type="password"
                placeholder="Digite sua nova senha!"
                onFocus={clearMessages}
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <label>
              Confirmar Nova Senha:
              <input
                type="password"
                placeholder="Confirme sua nova senha!"
                value={passwordConfirm}
                required
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
              {passwordBlockCheckLogic && (
                <p className="error-message">
                  Não é permitido modificar email!
                </p>
              )}
            </label>
            {!passwordBlockCheckLogic && !success && (
              <div>
                <Button
                  color="success"
                  onClick={() => modifyData({ password })}
                >
                  Modificar Senha
                </Button>
              </div>
            )}
          </AccordionBody>
        </AccordionItem>
      </Accordion>
    </form>
  );
}
