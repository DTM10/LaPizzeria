import { formatCurrency } from '../../Helper';
import styles from './invoice.module.css';
import CardButton from '../CardButton/CardButton';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

export default function Invoice({
	organizedPizzas,
	setCheckingOut,
	checkingOut,
	totals
}) {
	const handleCheckout = () => {
		setCheckingOut(!checkingOut);
	};

	return (
		<div className={styles.invoice}>
			<div className={styles.invoiceContainer}>
				<p children className={styles.priceDetail}>
					Total Before Tax: {formatCurrency(totals.totalBTax)}
				</p>
				<p className={styles.priceDetail}>Tax: {formatCurrency(totals.tax)}</p>

				<p className={styles.grandTotal}>
					Grand Total: {formatCurrency(totals.grandTotal)}
				</p>
				<div className={styles.btnContainer}>
					<CardButton
						handlePress={handleCheckout}
						text={'CHECKOUT'}
						icon={faCartShopping}
					/>
				</div>
			</div>
		</div>
	);
}
