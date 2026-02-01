import React from 'react';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Icon from '../Icon/Icon';

import styles from './InfoContent.module.css';

const InfoContent = ({ review, rating, location, reviewsLink }) => {
  const reviewsCount = review.length;
  const ratingText = `${rating} (${reviewsCount} Reviews)`;
  const showReviewsLink = reviewsCount > 0 && reviewsLink;

  return (
    <div className={styles.camperBottomInfo}>
      {showReviewsLink ? (
        <Link to={reviewsLink} className={styles.camperRating}>
          <Icon name="icon-star" size={16} className={styles.ratingIcon} />
          <span>{ratingText}</span>
        </Link>
      ) : (
        <div className={styles.camperRating}>
          <Icon name="icon-star" size={16} className={styles.ratingIcon} />
          <span>{ratingText}</span>
        </div>
      )}
      <div className={styles.camperLocation}>
        <Icon name="icon-map" size={16} className={styles.iconMap} />
        <p>{location}</p>
      </div>
    </div>
  );
};

InfoContent.propTypes = {
  review: PropTypes.arrayOf(
    PropTypes.shape({
      reviewer_name: PropTypes.string.isRequired,
      reviewer_rating: PropTypes.number.isRequired,
      comment: PropTypes.string.isRequired,
    })
  ).isRequired,
  rating: PropTypes.number.isRequired,
  location: PropTypes.string.isRequired,
  reviewsLink: PropTypes.string,
};

export default InfoContent;
