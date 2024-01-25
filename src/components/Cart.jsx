import React from 'react';
import styles from '../styles/home.module.css';
import Header from './Header';

export function Cart({ cartItems }) {
	return (
		<div className={styles.home}>
			<Header />
			<h1>I am the Cart</h1>
			{cartItems.map((pizza) => (
				<p>{pizza.title}</p>
			))}
		</div>
	);
}
