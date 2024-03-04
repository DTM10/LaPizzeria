import React, { useContext, useEffect, useState } from 'react';
import styles from './header.module.css';
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
    console.log('toggleLinks');
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
        <Link to="/" className={styles.customBrand}>
          <img
            src={'/images/pizza-logo.webp'}
            alt="pizza-logo"
            className={styles.logo}
            size="lg"
          />
        </Link>
        <div className={styles.navbar}>
          <i
            aria-controls="basic-navbar-nav"
            className={styles.customToggle}
            onClick={toggleLinks}
          >
            <FontAwesomeIcon icon={faBars} className={styles.togglerIcon} />
          </i>
          <div className={linksClasses}>
            <Link to="/tracker" className={styles.link}>
              Tracker
            </Link>
            <Link to="/menu" className={styles.link}>
              Menu
            </Link>
            <Link to="/login" className={styles.link}>
              Login
            </Link>
            <Link to="/cart" className={styles.link}>
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
