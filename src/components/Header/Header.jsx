import React, { useContext, useEffect, useState } from 'react';
import styles from './Header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faBars } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../Helper';
import { CartContext } from '../../context/CartContext';

function Header() {
  const { cartItems, cartAmount } = useContext(CartContext);
  const [isActive, setIsActive] = useState(false);
  const [linksClasses, setClasses] = useState(styles.linksContainer);

  const toggleLinks = () => {
    setIsActive(!isActive);
  };

  useEffect(() => {
    const divClass = classNames(styles.linksContainer, {
      [styles.active]: isActive,
    });
    setClasses(divClass);
  }, [isActive]);

  return (
    <div className={styles.header}>
      <nav className={styles.navbarContainer}>
        <div className={styles.mobileShowContainer}>
          <Link to="/" className={styles.customBrand}>
            <img
              src={'/images/pizza-logo.webp'}
              alt="pizza-logo"
              className={styles.logo}
              size="lg"
            />
          </Link>
          <i
            aria-controls="basic-navbar-nav"
            className={styles.customToggle}
            onClick={toggleLinks}
          >
            <FontAwesomeIcon icon={faBars} className={styles.togglerIcon} />
          </i>
        </div>
        <div className={styles.navbar}>
          <div className={linksClasses}>
            <Link to="/tracker" className={styles.link} onClick={toggleLinks}>
              Tracker
            </Link>
            <Link to="/menu" className={styles.link} onClick={toggleLinks}>
              Menu
            </Link>
            <Link to="/login" className={styles.link} onClick={toggleLinks}>
              Login
            </Link>
            <Link to="/cart" className={styles.link} onClick={toggleLinks}>
              <div
                className={
                  cartItems.length > 0 ? styles.cart : styles.emptyCart
                }
              >
                <FontAwesomeIcon
                  icon={faCartShopping}
                  className={
                    cartItems.length > 0
                      ? styles.cartIcon
                      : styles.emptyCartIcon
                  }
                />
                {cartAmount > 0 && (
                  <div className={styles.cartAmount}>
                    {formatCurrency(cartAmount)}
                  </div>
                )}
              </div>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
