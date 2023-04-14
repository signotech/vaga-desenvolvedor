import React from 'react';
import PropTypes from 'prop-types';
import deleteIcon from '../../../assets/delete.svg';

import { Container } from './styles';

export default function Card({
  title, subtitle, subtitleDescription, small, smallDescription,
}) {
  return (
    <Container>
      <div className="information">
        <strong>{title}</strong>
        <small>
          <b>{subtitleDescription}</b>
          {' '}
          {subtitle}
        </small>
        <small>
          <b>{smallDescription}</b>
          {' '}
          {small}
        </small>
        <a href="/">ver mais</a>
      </div>
      <div className="actions">
        <img src={deleteIcon} alt="delete" />
      </div>
    </Container>
  );
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  subtitleDescription: PropTypes.string.isRequired,
  small: PropTypes.string.isRequired,
  smallDescription: PropTypes.string.isRequired,
};
