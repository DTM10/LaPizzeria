import React, { useState, useEffect, useContext } from 'react';
import styles from '../styles/menu.module.css';
import { PizzaCard } from './PizzaCard';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { CartContext } from '../context/CartContext';

export function Menu() {
	const { addCartItems } = useContext(CartContext);
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
				src: doc.data().src
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
							addCartItems={addCartItems}
						/>
					);
				})}
			</div>
		</div>
	);
}
