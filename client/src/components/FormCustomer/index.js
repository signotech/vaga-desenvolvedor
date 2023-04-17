import React from 'react';

import InputForm from '../InputForm/Index';
import Button from '../Button';

import { Form } from './styles';

export default function FormCustomer() {
  return (
    <Form>
      <InputForm
        placeholder="Nome do cliente"
        type="text"
      />
      <InputForm
        placeholder="E-mail do cliente"
        type="text"
      />
      <InputForm
        placeholder="CPF"
        type="text"
      />
      <Button
        type="button"
        form
      >
        Salvar
      </Button>
    </Form>
  );
}
