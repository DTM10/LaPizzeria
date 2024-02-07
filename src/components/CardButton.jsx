import React from 'react';
import styles from '../styles/cardButton.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

export default function CardButton({ handlePress, text, icon }) {
	// MAKE THIS BUTTON REUSABLE ADDING THE PROPS ABOVE
	return (
		<button
			className={styles.cardBtn}
			onClick={() => {
				handlePress();
			}}
		>
			<FontAwesomeIcon icon={faCartShopping} className={styles.cartIcon} />
			<p className={styles.btnText}>ADD TO CART</p>
		</button>
	);
}
