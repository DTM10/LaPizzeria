import React, { useContext, useEffect, useState } from 'react';
import styles from '../styles/cart.module.css';
import CartCard from './CartCard';
import CartHeader from './CartHeader';
import Invoice from './Invoice';
import Checkout from './Checkout';
import { CartContext } from '../context/CartContext';
import { specialsCheck, aggregateItems, calculateTotal } from '../Helper';

export function Cart() {
	const { cartItems, weekDay, sundaySpecial } = useContext(CartContext);
	const [organizedPizzas, setOrganizedPizzas] = useState([]);
	const [checkingOut, setCheckingOut] = useState(false);
	const [totalsObj, setTotalsObj] = useState({});

	useEffect(() => {
		const aggregatedItems = aggregateItems(cartItems);
		const organized = specialsCheck(weekDay, aggregatedItems, sundaySpecial);
		setOrganizedPizzas(organized);
	}, [cartItems, weekDay, sundaySpecial]);

	useEffect(() => {
		if (organizedPizzas.length > 0) {
			const totals = calculateTotal(organizedPizzas);
			setTotalsObj(totals);
		}
	}, [organizedPizzas]);

	return (
		<div className={styles.totalContainer}>
			{checkingOut && (
				<Checkout
					subTotal={totalsObj.totalBTax}
					taxAmount={totalsObj.tax}
					grandTotal={totalsObj.grandTotal}
					setCheckingOut={setCheckingOut}
					checkingOut={checkingOut}
				/>
			)}
			<div className={checkingOut ? styles.cartCheckingOut : styles.cart}>
				{cartItems.length > 0 && (
					<div className={styles.cartContainer}>
						<CartHeader />
						<div className={styles.cardsContainer}>
							{organizedPizzas.map((pizza) => (
								<CartCard
									qty={pizza.count}
									pizzaName={pizza.title}
									pizzaImg={pizza.src}
									id={pizza.id}
									key={pizza.id}
									priceDescrip={pizza.priceDesc}
									subTotal={pizza.subTotal}
									price={pizza.price}
								/>
							))}
						</div>
					</div>
				)}
				{cartItems.length > 0 && (
					<Invoice
						weekDay={weekDay}
						setCheckingOut={setCheckingOut}
						checkingOut={checkingOut}
						totals={totalsObj}
					/>
				)}
			</div>
		</div>
	);
}

/* 
	 		
	- ADD BUTTON TO CLEAR THE CART
	
*/
