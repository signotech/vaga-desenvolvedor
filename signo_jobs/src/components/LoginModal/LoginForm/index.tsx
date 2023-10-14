import useLogin from "@/hooks/useLogin";
import { FormModalProps } from "@/interfaces/FormModalProps";
import { AuthLoginSchema } from "@/schemas/AuthSchemas";
import { fetchApi } from "@/utils/fetch";
import { useRouter } from "next/router";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import React, { FormEvent, useState } from "react";
import { Alert, Button, ModalBody, ModalFooter } from "reactstrap";

export default function LoginForm(props: FormModalProps) {
  const { toggle, changeForm } = props;
  const {
    cleanMessages,
    login,
    error,
    setEmail,
    email,
    setPassword,
    password,
  } = useLogin();

  return (
    <>
      <ModalBody>
        <form onSubmit={login}>
          {error && <Alert color="danger">{error}</Alert>}
          <label>
            Email:
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              onFocus={cleanMessages}
              required
              placeholder="Digite seu email!"
            />
          </label>
          <label>
            Senha:
            <input
              onFocus={cleanMessages}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              required
              placeholder="Digite sua senha!"
            />
          </label>
          <p onClick={changeForm}>Ainda não sou cadastrado?</p>
          <ModalFooter>
            <Button color="success" type="submit">
              Login
            </Button>{" "}
            <Button color="danger" type="button" onClick={toggle}>
              Cancelar
            </Button>
          </ModalFooter>
        </form>
      </ModalBody>
    </>
  );
}
