import React, { useEffect, useState } from 'react';
import styles from '../styles/home.module.css';
import Header from './Header';
import CartCard from './CartCard';
import CartHeader from './CartHeader';

export function Cart({ cartItems }) {
	const [organizedPizzas, setOrganizedPizzas] = useState([]);

	useEffect(() => {
		const aggregateItems = () => {
			const aggregationMap = cartItems.reduce((acc, item) => {
				if (!acc[item.id]) {
					acc[item.id] = { ...item, count: 1 };
				} else {
					acc[item.id].count += 1;
				}
				console.log('acc is: ', acc);
				return acc;
			}, {});
			return Object.values(aggregationMap);
		};

		const aggregatedItems = aggregateItems();
		setOrganizedPizzas(aggregatedItems);
		console.log('aggregatedItems are: ', aggregatedItems);
	}, [cartItems]);

	return (
		<div className={styles.home}>
			<Header cartItems={cartItems} />
			<CartHeader />
			{organizedPizzas.map((pizza) => (
				<CartCard
					qty={pizza.count}
					pizzaName={pizza.title}
					pizzaImg={pizza.src}
					key={pizza.id}
				/>
			))}
		</div>
	);
}
