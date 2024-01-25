import React, { useState, useEffect } from 'react';
import styles from '../styles/menu.module.css';
import Header from './Header';
import { PizzaCard } from './PizzaCard';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export function Menu({ addCartItems }) {
	const [pizzas, setPizzas] = useState([]);

	useEffect(() => {
		fetchPizzasInfo();
	}, []);

	const fetchPizzasInfo = async () => {
		console.log('fetchPizzasInfo');
		const tempPizzas = [];
		const querySnapshot = await getDocs(collection(db, 'Pizzas'));
		querySnapshot.forEach((doc) => {
			console.log(doc.id, ' => ', doc.data().title);
			tempPizzas.push({
				id: doc.id,
				title: doc.data().title,
				description: doc.data().description,
				src: doc.data().src
			});
		});

		setPizzas(tempPizzas);
	};

	return (
		<div className={styles.menu}>
			<Header />
			<div className={styles.cardsContainer}>
				{pizzas.map((pizza) => {
					return (
						<PizzaCard
							id={pizza.id}
							imgSrc={pizza.src}
							title={pizza.title}
							description={pizza.description}
							key={pizza.id}
							addCartItems={addCartItems}
						/>
					);
				})}
			</div>
		</div>
	);
}
