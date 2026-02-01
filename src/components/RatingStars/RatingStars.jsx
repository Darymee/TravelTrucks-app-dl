import React from 'react';

import PropTypes from 'prop-types';

import Icon from '../Icon/Icon';

import styles from './RatingStars.module.css';

function clampRating(rating) {
  const n = Number(rating);
  if (Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(5, Math.round(n)));
}

const RatingStars = ({ rating }) => {
  const r = clampRating(rating);

  return (
    <div className={styles.stars} aria-label={`Rating: ${r} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Icon
          key={i}
          name="icon-star"
          size={16}
          className={`${i < r ? styles.full : styles.empty}`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
};

RatingStars.propTypes = {
  rating: PropTypes.number,
};

export default RatingStars;
