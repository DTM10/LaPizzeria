import styles from '../styles/cartCard.module.css';

export default function CartCard({ qty, pizzaName, pizzaImg, imgAltText }) {
	return (
		<div className={styles.cartCard}>
			<div className={styles.qty}>
				<p className={styles.label}>QTY</p>
				<p>{qty}</p>
			</div>
			<div className={styles.pizza}>
				<p className={styles.label}>PIZZA</p>
				<div className={styles.pizzaDetails}>
					<img src={pizzaImg} alt={imgAltText} className={styles.pizzaImg} />
					<p>{pizzaName}</p>
				</div>
			</div>
		</div>
	);
}
