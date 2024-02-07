import React, { useContext } from 'react';
import styles from '../styles/pizzaCard.module.css';
import CardButton from './CardButton';
import { CartContext } from '../context/CartContext';

export function PizzaCard({ id, imgSrc, imgAltText, title, description }) {
	const { addCartItems } = useContext(CartContext);
	const handleAddition = () => {
		console.log('handleAddition called');
		const addingPizza = {
			id: id,
			title: title,
			src: imgSrc,
			imgAltText: imgAltText
		};

		addCartItems([addingPizza]);
	};

	return (
		<div className={styles.card}>
			<img src={imgSrc} alt={imgAltText} className={styles.pizzaImg} />
			<h2 className={styles.pizzaTitle}>{title}</h2>
			<p className={styles.description}>{description}</p>
			<CardButton handlePress={handleAddition} />
		</div>
	);
}
