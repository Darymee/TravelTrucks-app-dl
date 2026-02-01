import React from 'react';

import PropTypes from 'prop-types';

import CamperItem from './CamperItem/CamperItem';

import styles from './CamperList.module.css';

const CamperList = ({ items }) => (
  <ul className={styles.camperList}>
    {items.map(camper => (
      <li key={camper.id}>
        <CamperItem item={camper} />
      </li>
    ))}
  </ul>
);

CamperList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default CamperList;
