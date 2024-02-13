import React from 'react';
import { formatCurrency } from '../Helper';
import styles from '../styles/checkout.module.css';
import CardButton from './CardButton';
import { faCartShopping, faX } from '@fortawesome/free-solid-svg-icons';

export default function Invoice({
	subTotal,
	taxAmount,
	grandTotal,
	setCheckingOut,
	checkingOut
}) {
	const handleCancel = () => {
		setCheckingOut(!checkingOut);
	};

	const handlePlaceOrder = () => {
		console.log('handlePlaceOrder');
	};

	return (
		<div className={styles.invoice}>
			<div>
				<CardButton
					className={styles.modalCloseBtn}
					handlePress={handleCancel}
					icon={faX}
				/>
			</div>
			<div className={styles.invoiceContainer}>
				<p children className={styles.priceDetail}>
					Total Before Tax: {formatCurrency(subTotal)}
				</p>
				<p className={styles.priceDetail}>Tax: {formatCurrency(taxAmount)}</p>
				{/* <p>Tip: {formatCurrency(tip)}</p> */}
				<p className={styles.grandTotal}>
					Grand Total: {formatCurrency(grandTotal)}
				</p>
				<div className={styles.btnContainer}>
					<CardButton
						handlePress={handlePlaceOrder}
						text={'PLACE ORDER'}
						icon={faCartShopping}
					/>
				</div>
			</div>
		</div>
	);
}
