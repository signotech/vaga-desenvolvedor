import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function LinkAnchor({
  pageSelected, title, setSeleted, seleted, children,
}) {
  function handleSeletectPage(page) {
    window.localStorage.setItem('page', page);
    setSeleted(window.localStorage.getItem('page'));
  }

  return (
    <Link
      to={`/${pageSelected}`}
      style={{
        textDecoration: seleted === pageSelected ? 'underline' : 'none',
        color: seleted === pageSelected ? '#FC794F' : '#FE9F80',
      }}
      onClick={() => handleSeletectPage(pageSelected)}
    >
      {title || children}
    </Link>
  );
}

LinkAnchor.propTypes = {
  pageSelected: PropTypes.string.isRequired,
  title: PropTypes.string,
  setSeleted: PropTypes.func.isRequired,
  seleted: PropTypes.string.isRequired,
};
