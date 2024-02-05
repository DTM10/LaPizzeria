import React from 'react';
import styles from '../styles/home.module.css';
// import Header from './Header';
// import Promo from '../images/Promo.png';

export function Home({ cartItems }) {
	return (
		<div className={styles.home}>
			<div className={styles.imgContainer}>
				<img
					src={'/images/Promo.png'}
					alt="promo-two-pizzas-for-20-dollars"
					className={styles.img}
				/>
			</div>
		</div>
	);
}
