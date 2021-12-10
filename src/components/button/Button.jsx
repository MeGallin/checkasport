import React from 'react';
import PropTypes from 'prop-types';
import './Button.scss';

const Button = ({ colour, text, onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{ backgroundColor: colour }}
      className="btn"
    >
      {text}
    </button>
  );
};

Button.defaultrops = {
  color: 'yellow',
};

Button.propTypes = {
  text: PropTypes.string,
  colour: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
