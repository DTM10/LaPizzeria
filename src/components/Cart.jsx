import React, { useContext, useEffect, useState } from 'react';
import styles from '../styles/home.module.css';
import CartCard from './CartCard';
import CartHeader from './CartHeader';
import Invoice from './Invoice';
import { CartContext } from '../context/CartContext';

export function Cart() {
	const { cartItems } = useContext(CartContext);
	const [organizedPizzas, setOrganizedPizzas] = useState([]);
	const [weekDay, setWeekDay] = useState(7);

	useEffect(() => {
		const aggregateItems = () => {
			const aggregationMap = cartItems.reduce((acc, item) => {
				if (!acc[item.id]) {
					acc[item.id] = { ...item, count: 1 };
				} else {
					acc[item.id].count += 1;
				}
				return acc;
			}, {});
			return Object.values(aggregationMap);
		};

		const aggregatedItems = aggregateItems();
		setOrganizedPizzas(aggregatedItems);
		console.log('aggregatedItems are: ', aggregatedItems);

		const day = new Date().getDay();
		setWeekDay(day);
	}, [cartItems]);

	return (
		<div className={styles.home}>
			<CartHeader />
			{organizedPizzas.map((pizza) => (
				<CartCard
					qty={pizza.count}
					pizzaName={pizza.title}
					pizzaImg={pizza.src}
					id={pizza.id}
					key={pizza.id}
				/>
			))}
			<hr />
			{cartItems.length > 0 && (
				<Invoice organizedPizzas={organizedPizzas} weekDay={weekDay} />
			)}
		</div>
	);
}

/*

WRITE THE LOGIC TO CREATE THE INVOICE.
EACH PIZZA IS 14 DOLLARS
CHECK IF ANY SPECIAL IS APPLYIED AND CALCULATE THE PRICE
CALCULATE THE TAXES
FIELD AND BUTTON TO TIP
ADD BUTTON TO CHECKOUT 
ADD BUTTON TO CLEAR THE CART

*/
