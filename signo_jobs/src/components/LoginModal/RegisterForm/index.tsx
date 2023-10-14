import useRegister from "@/hooks/useRegister";
import { FormModalProps } from "@/interfaces/FormModalProps";
import { UserCreateSchema } from "@/schemas/UserSchemas";
import { fetchApi } from "@/utils/fetch";
import React, { FormEvent, useState } from "react";
import { Alert, Button, ModalBody, ModalFooter } from "reactstrap";

export default function RegisterForm(props: FormModalProps) {
  const { toggle, changeForm } = props;
  const {
    register,
    cleanMessages,
    error,
    success,
    disabledButtonRegister,
    setName,
    name,
    setEmail,
    email,
    setPassword,
    password,
    setPasswordConfirm,
    passwordConfirm,
    setRole,
    role,
  } = useRegister();

  return (
    <>
      <ModalBody>
        <form onSubmit={register}>
          {error && <Alert color="danger">{error}</Alert>}
          {success && (
            <Alert color="success">
              Cadastro efetuado com sucesso,{" "}
              <span onClick={changeForm}>Ir para Login</span>
            </Alert>
          )}
          <label>
            Nome:
            <input
              type="text"
              value={name}
              onFocus={cleanMessages}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Digite seu nome!"
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onFocus={cleanMessages}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Digite seu email!"
            />
          </label>
          <label>
            Senha:
            <input
              type="password"
              value={password}
              onFocus={cleanMessages}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Digite seu email!"
            />
          </label>
          <label>
            Confirmar Senha:
            <input
              type="password"
              value={passwordConfirm}
              onFocus={cleanMessages}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              required
              placeholder="Digite seu email!"
            />
            {password && passwordConfirm && password != passwordConfirm && (
              <p className="error-message">Senhas não correspondem</p>
            )}
          </label>
          <label>
            Tipo de Conta:
            <select
              onFocus={cleanMessages}
              onChange={(e) => setRole(e.target.value)}
              value={role}
              required
            >
              <option value="">Selecionar Tipo</option>
              <option value="ADMIN">Empregador</option>
              <option value="USER">Candidato</option>
            </select>
          </label>
          <p onClick={changeForm}>Já sou cadastrado?</p>
          <ModalFooter>
            <Button
              color="success"
              disabled={disabledButtonRegister}
              type="submit"
            >
              Cadastrar
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
