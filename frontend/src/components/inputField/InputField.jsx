import React from 'react';
import './InputField.scss';
import PropTypes from 'prop-types';

const InputField = ({
  type,
  label,
  name,
  value,
  placeholder,
  error,
  className,
  onChange,
}) => {
  return (
    <div className="input-field-wrapper">
      {label && <label htmlFor="input-field">{label}</label>}
      <input
        className="input-field"
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        error={error}
        className={className}
        onChange={onChange}
      />
      {error && <p className="validation-error">{error}</p>}
    </div>
  );
};

InputField.defaultProps = {
  type: 'text',
};

InputField.propTypes = {
  text: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func,
};

export default InputField;
