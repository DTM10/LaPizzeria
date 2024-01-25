import React from 'react';
import styles from '../styles/cardButton.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

export function CardButton({ handleAddition }) {
	return (
		<button
			className={styles.cardBtn}
			onClick={() => {
				handleAddition();
			}}
		>
			<FontAwesomeIcon icon={faCartShopping} className={styles.cartIcon} />
			<p className={styles.btnText}>ADD TO CART</p>
		</button>
	);
}
