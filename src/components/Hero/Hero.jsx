import React from 'react';

import StyledLink from '../StyledLink/StyledLink';

import styles from './Hero.module.css';

const Hero = () => (
  <section className={styles.hero}>
    <div className="container hero">
      <div className={styles.content}>
        <h1 className={styles.title}>Campers of your dreams</h1>
        <p className={styles.subtitle}>
          You can find everything you want in our catalog
        </p>
        <StyledLink to="/catalog" className={styles.viewBtn} text="View Now" />
      </div>
    </div>
  </section>
);

export default Hero;
