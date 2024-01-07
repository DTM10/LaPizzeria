import React from 'react';
import styles from '../styles/cardButton.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

export function CardButton(props) {
	const handleBtnClick = () => {
		console.log('ADD TO CART clicked');
	};
	return (
		<button
			className={styles.cardBtn}
			onClick={() => {
				handleBtnClick();
			}}
		>
			<FontAwesomeIcon icon={faCartShopping} className={styles.cartIcon} />
			<p className={styles.btnText}>ADD TO CART</p>
		</button>
	);
}
