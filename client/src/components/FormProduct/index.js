import React from 'react';

import InputForm from '../InputForm/Index';
import Button from '../Button';

import { Form } from './styles';

export default function FormProduct() {
  return (
    <Form>
      <InputForm
        placeholder="Título do produto"
        type="text"
      />
      <InputForm
        placeholder="Tipo"
        type="text"
      />
      <InputForm
        placeholder="Preço"
        type="text"
      />
      <InputForm
        placeholder="Estoque"
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
