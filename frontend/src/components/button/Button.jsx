import React from 'react';
import PropTypes from 'prop-types';
import './Button.scss';

const Button = ({ colour, text, disabled, onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{ backgroundColor: colour }}
      className={disabled ? 'btn disabled' : 'btn not-disabled'}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

Button.defaultProps = {
  color: 'yellow',
  disabled: true,
};

Button.propTypes = {
  text: PropTypes.string,
  colour: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Button;
