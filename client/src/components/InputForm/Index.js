import React from 'react';
import Proptypes from 'prop-types';

import { Container } from './styles';

import Input from '../Input';

export default function InputForm({ error, placeholder, type }) {
  return (
    <Container>
      <Input
        placeholder={placeholder}
        type={type}
      />
      {error && <p>error</p>}
    </Container>
  );
}

InputForm.propTypes = {
  error: Proptypes.bool,
  placeholder: Proptypes.string.isRequired,
  type: Proptypes.string.isRequired,
};

InputForm.defaultProps = {
  error: false,
};
