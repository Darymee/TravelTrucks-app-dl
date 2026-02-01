import React from 'react';

import PropTypes from 'prop-types';

import styles from './Button.module.css';

const Button = ({
  text,
  className = '',
  type = 'button',
  onClick,
  disabled = false,
}) => (
  <button
    type={type}
    className={`${styles.btn} ${className}`}
    onClick={onClick}
    disabled={disabled}
  >
    {text}
  </button>
);

Button.propTypes = {
  text: PropTypes.node.isRequired,
  className: PropTypes.string,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

export default Button;
