import React from 'react';
import styles from '../styles/pizzaCard.module.css';
import { CardButton } from './CardButton';

export function PizzaCard({
	id,
	imgSrc,
	imgAltText,
	title,
	description,
	addCartItems
}) {
	const handleAddition = () => {
		console.log('handleAddition called');
		const addingPizzas = {
			id: id,
			title: title,
			src: imgSrc,
			imgAltText: imgAltText
		};

		addCartItems([addingPizzas]);
	};

	return (
		<div className={styles.card}>
			<img src={imgSrc} alt={imgAltText} className={styles.pizzaImg} />
			<h2 className={styles.pizzaTitle}>{title}</h2>
			<p className={styles.description}>{description}</p>
			<CardButton handleAddition={handleAddition} />
		</div>
	);
}

/* 
IMPLEMENT THE BUTTON FUNCTIONALITY WITH THE PROP PASSED
*/
