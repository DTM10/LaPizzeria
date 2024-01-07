import React from 'react';
import styles from '../styles/home.module.css';
import Header from './Header';
import { PizzaCard } from './PizzaCard';
// import AnchiovesPizza from '../images/Anchovies.png';

export function Menu() {
	const AnchiovesPizza = '../images/Anchovies.png';
	return (
		<div className={styles.home}>
			<div>
				<Header />
				<PizzaCard
					imgSrc={AnchiovesPizza}
					title="Anchioves"
					description="Anchovies are a common topping in Italy. They are  paired with olives, capers, red onions and tomatoes."
				/>
			</div>
		</div>
	);
}

/* 
INSTEAD OF ADDING MANUALLY THE PIZZAS, I SHOULD CREATE THE 
DATABASE WITH ALL PIZZA INFO, AND THEN CREATE THE CARDS IN 
A LOOP. 
*/
