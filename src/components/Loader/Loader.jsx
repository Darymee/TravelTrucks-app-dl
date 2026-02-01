import React from 'react';

import { ClipLoader } from 'react-spinners';

import styles from './Loader.module.css';

const Loader = () => (
  <div className={styles.wrapper}>
    <ClipLoader
      className={styles.loader}
      size={80}
      aria-label="Loading Spinner"
      data-testid="loader"
      color="#e44848"
    />
  </div>
);

export default Loader;
