import styles from '../styles/qtyToggle.module.css';
export default function QtyToggle({
	handleDecrease,
	handleIncrease,
	qty,
	param
}) {
	return (
		<div className={styles.qty}>
			<button
				className={styles.btn}
				onClick={() => {
					if (param) {
						handleDecrease(param);
					} else {
						handleDecrease();
					}
				}}
			>
				-
			</button>
			<p className={styles.qty}>{qty}</p>
			<button
				className={styles.btn}
				onClick={() => {
					if (param) {
						handleIncrease(param);
					} else {
						handleIncrease();
					}
				}}
			>
				+
			</button>
		</div>
	);
}
