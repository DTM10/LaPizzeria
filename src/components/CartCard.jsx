import React, { useContext } from 'react';
import styles from '../styles/cartCard.module.css';
import { CartContext } from '../context/CartContext';

export default function CartCard({ qty, pizzaName, pizzaImg, imgAltText, id }) {
	const { increaseItemCount, removeCartItem } = useContext(CartContext);
	return (
		<div className={styles.cartCard}>
			<div className={styles.cardContainer}>
				<div className={styles.qty}>
					<button
						onClick={() => {
							removeCartItem(id);
						}}
					>
						-
					</button>
					<p className={styles.pizzaName}>{qty}</p>
					<button
						onClick={() => {
							increaseItemCount(id);
						}}
					>
						+
					</button>
				</div>
				<div className={styles.divider}></div>
				<div className={styles.pizza}>
					<div className={styles.pizzaDetails}>
						<img src={pizzaImg} alt={imgAltText} className={styles.pizzaImg} />
						<p className={styles.pizzaName}>{pizzaName}</p>
					</div>
				</div>
			</div>
		</div>
	);
}
