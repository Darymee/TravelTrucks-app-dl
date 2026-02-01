import React from 'react';

import bannerUrl from '../../assets/camper-banner.jpg';

import styles from './Banner.module.css';

const Banner = () => (
  <div>
    <img src={bannerUrl} alt="Camper banner" className={styles.banner} />
  </div>
);

export default Banner;
