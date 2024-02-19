import React, { useState, useEffect } from 'react';
import styles from './menu.module.css';
import { PizzaCard } from '../PizzaCard/PizzaCard';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

export function Menu() {
	const [pizzas, setPizzas] = useState([]);

	useEffect(() => {
		fetchPizzasInfo();
	}, []);

	const fetchPizzasInfo = async () => {
		const tempPizzas = [];
		const querySnapshot = await getDocs(collection(db, 'Pizzas'));
		querySnapshot.forEach((doc) => {
			tempPizzas.push({
				id: doc.id,
				title: doc.data().title,
				description: doc.data().description,
				src: doc.data().src,
				price: doc.data().price,
				specialPrice: doc.data().specialPrice,
				specialDay: doc.data().specialDay
			});
		});

		setPizzas(tempPizzas);
	};

	return (
		<div className={styles.menu}>
			<div className={styles.cardsContainer}>
				{pizzas.map((pizza) => {
					return (
						<PizzaCard
							id={pizza.id}
							imgSrc={pizza.src}
							title={pizza.title}
							description={pizza.description}
							key={pizza.id}
							price={pizza.price}
							specialPrice={pizza.specialPrice}
							specialDay={pizza.specialDay}
						/>
					);
				})}
			</div>
		</div>
	);
}
