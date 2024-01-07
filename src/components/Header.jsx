import React from 'react';
import styles from '../styles/header.module.css';
import logo from '../images/pizza-logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faBars } from '@fortawesome/free-solid-svg-icons';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function Header() {
	return (
		<Navbar expand="lg" className={styles.header}>
			<Container>
				<Link to="/" className={`${styles.customBrand} navbar-brand`}>
					<img src={logo} alt="pizza-logo" className={styles.logo} size="lg" />
				</Link>

				<Navbar.Toggle
					aria-controls="basic-navbar-nav"
					className={styles.customToggle}
				>
					<FontAwesomeIcon icon={faBars} className={styles.togglerIcon} />
				</Navbar.Toggle>
				<Navbar.Collapse
					id="basic-navbar-nav"
					className={`${styles.linksContainer} me-auto justify-content-end`}
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
						<Link to="/cart" className={`${styles.link} nav-link`}>
							<FontAwesomeIcon
								icon={faCartShopping}
								className={styles.cartIcon}
							/>
						</Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default Header;
