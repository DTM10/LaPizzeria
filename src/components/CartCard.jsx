import styles from '../styles/cartCard.module.css';

export default function CartCard({ qty, pizzaName, pizzaImg, imgAltText }) {
	return (
		<div className={styles.cartCard}>
			<div className={styles.cardContainer}>
				<div className={styles.qty}>
					<p className={styles.pizzaName}>{qty}</p>
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
