import React from 'react';

import { Link, NavLink } from 'react-router-dom';

import Icon from '../Icon/Icon';

import styles from './Header.module.css';

const Header = () => (
  <header className={styles.header}>
    <div className={`container ${styles.headerContainer}`}>
      <Link to="/">
        <Icon name="icon-logo" height={16} width={136} />
      </Link>
      <nav className={styles.nav}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/catalog"
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
        >
          Catalog
        </NavLink>
      </nav>
    </div>
  </header>
);

export default Header;
