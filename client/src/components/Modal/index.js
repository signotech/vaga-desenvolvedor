import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import {
  Overlay, ModalContainer, Container, List,
} from './styles';

export default function Modal({ title, isOpen }) {
  if (!isOpen) {
    return null;
  }
  return ReactDOM.createPortal(
    <Overlay>
      <ModalContainer>
        <Container>
          <h1>
            Selecionar
            {' '}
            {title}
          </h1>
          <List>
            <p>José da Silva</p>
            <p>123.546.789-11</p>
          </List>
          <List>
            <p>José da Silva</p>
            <p>123.546.789-11</p>
          </List>
        </Container>
      </ModalContainer>
    </Overlay>,
    document.getElementById('modal'),
  );
}

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  setOpen: PropTypes.func,
};
