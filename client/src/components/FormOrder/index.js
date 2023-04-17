import React, { useState } from 'react';

import InputForm from '../InputForm/Index';
import InputCustomer from './InputCustomer';
import InputProduct from './InputProduct';
import Button from '../Button';
import Modal from '../Modal';

import { Form } from './styles';

export default function FormOrder() {
  const [isOpenModalCustomer, setOpenModalCustomer] = useState(false);
  const [isOpenModalProduct, setOpenModalProduct] = useState(false);

  function handleOpenModalCustomer() {
    setOpenModalCustomer(true);
  }

  function handleOpenModalProduct() {
    setOpenModalProduct(true);
  }

  return (
    <>
      <Modal
        title="Cliente"
        isOpen={isOpenModalCustomer}
      />

      <Modal
        title="Produtos"
        isOpen={isOpenModalProduct}
      />

      <Form>
        <InputCustomer>
          <Button
            type="button"
            onClick={(e) => handleOpenModalCustomer()}
          >
            <small>Selecionar Cliente</small>
          </Button>
        </InputCustomer>
        <InputProduct>
          <div className="table">
            <div className="header-table">
              <p>Produto</p>
              <p>Unidade</p>
              <p>Preço</p>
            </div>
            <div className="content-table">
              <p>Monitor 27º</p>
              <p>Unidade</p>
              <p>R$ 700,00</p>
            </div>
            <div className="content-table">
              <p>Monitor 27º</p>
              <p>Unidade</p>
              <p>R$ 700,00</p>
            </div>
          </div>
          <Button
            type="button"
            onClick={() => handleOpenModalProduct()}
          >
            Adicionar produtos
          </Button>
        </InputProduct>
        <InputForm
          placeholder="Situção"
          type="text"
        />
        <InputForm
          placeholder="Data do pedido"
          type="date"
        />
        <Button
          type="button"
          form
        >
          Salvar
        </Button>
      </Form>
    </>
  );
}
