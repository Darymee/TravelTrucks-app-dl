import React from 'react';

import PropTypes from 'prop-types';

import styles from './ErrorMessage.module.css';

const ErrorMessage = ({ id, text }) => (
  <p id={id} className={styles.errorText}>
    {text}
  </p>
);

ErrorMessage.propTypes = {
  id: PropTypes.string,
  text: PropTypes.string.isRequired,
};

export default ErrorMessage;
