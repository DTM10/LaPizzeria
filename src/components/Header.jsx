import React, { useContext } from 'react';
import styles from '../styles/header.module.css';
// import logo from '../images/pizza-logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faBars } from '@fortawesome/free-solid-svg-icons';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../Helper';
import { CartContext } from '../context/CartContext';

function Header() {
	const { cartItems, cartAmount } = useContext(CartContext);

	return (
		<Navbar expand="lg" className={`${styles.header} w-100`}>
			<Container className={styles.navContainer}>
				<Link to="/" className={`${styles.customBrand} navbar-brand`}>
					<img
						src={'/images/pizza-logo.webp'}
						alt="pizza-logo"
						className={styles.logo}
						size="lg"
					/>
				</Link>

				<Navbar.Toggle
					aria-controls="basic-navbar-nav"
					className={styles.customToggle}
				>
					<FontAwesomeIcon icon={faBars} className={styles.togglerIcon} />
				</Navbar.Toggle>
				<Navbar.Collapse
					id="basic-navbar-nav"
					className={`${styles.linksContainer}`}
				>
					<Nav>
						<Link to="/tracker" className={`${styles.link} nav-link`}>
							Tracker
						</Link>
						<Link to="/menu" className={`${styles.link} nav-link`}>
							Menu
						</Link>
						<Link to="/login" className={`${styles.link} nav-link`}>
							Login
						</Link>
						<Link to="/cart" className={`${styles.link} nav-link `}>
							<FontAwesomeIcon
								icon={faCartShopping}
								className={
									cartItems.length > 0 ? styles.cartIcon : styles.emptyCartIcon
								}
							/>
							<p className={styles.cartAmount}>{formatCurrency(cartAmount)}</p>
						</Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default Header;
