import styles from '../styles/cartHeader.module.css';

export default function CartHeader() {
	return (
		<div className={styles.cartHeader}>
			<div className={styles.cartHeaderContainer}>
				<p className={styles.label}>Pizza</p>
				<div className={styles.divider}></div>
				<p className={styles.label}>Price Details</p>
			</div>
		</div>
	);
}
