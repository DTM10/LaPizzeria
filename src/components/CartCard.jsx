import React, { useContext } from 'react';
import styles from '../styles/cartCard.module.css';
import { CartContext } from '../context/CartContext';

export default function CartCard({
	qty,
	pizzaName,
	pizzaImg,
	imgAltText,
	id,
	priceDescrip,
	subTotal,
	price
}) {
	const { increaseItemCount, removeCartItem } = useContext(CartContext);

	return (
		<div className={styles.cartCard}>
			<div className={styles.cardContainer}>
				<div className={styles.pizza}>
					<div className={styles.pizzaDetails}>
						<img src={pizzaImg} alt={imgAltText} className={styles.pizzaImg} />
						<p className={styles.pizzaName}>{pizzaName}</p>
					</div>
					<div className={styles.qty}>
						<button
							className={styles.btn}
							onClick={() => {
								increaseItemCount(id);
							}}
						>
							+
						</button>
						<p className={styles.qty}>{qty}</p>
						<button
							className={styles.btn}
							onClick={() => {
								removeCartItem(id);
							}}
						>
							-
						</button>
					</div>
				</div>
				<div className={styles.divider}></div>
				<div className={styles.price}>
					<p className={styles.label}>Price:</p>
					<p className={styles.priceDescrip}>{priceDescrip}</p>
					<p>${price}.00</p>
					<p className={styles.label}>Sub-total:</p>
					<p>${subTotal}.00</p>
				</div>
			</div>
		</div>
	);
}
