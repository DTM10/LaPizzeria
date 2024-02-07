import { specialsCheck, calculateTotal } from '../Helper';

export default function Invoice({ organizedPizzas, weekDay }) {
	const invoiceDetails = specialsCheck(weekDay, organizedPizzas);
	const totals = calculateTotal(invoiceDetails, 10);
	return (
		<div>
			{invoiceDetails.map((p) => {
				return (
					<div key={p.id}>
						<p>Qty: {p.qty}</p>
						<p>Pizza: {p.title}</p>
						<p>Price Description: {p.priceDesc}</p>
						<p>SubTotal: {p.subTotal}</p>
					</div>
				);
			})}

			<p>Total Before Tax: {totals.totalBTax}</p>
			<p>Tax: {totals.tax}</p>
			<p>Tip: {totals.tip}</p>
			<p>Grand Total: {totals.grandTotal}</p>
		</div>
	);
}
