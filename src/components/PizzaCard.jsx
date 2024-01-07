import React from 'react';
import styles from '../styles/pizzaCard.module.css';
import { CardButton } from './CardButton';

export function PizzaCard(props) {
	return (
		<div className={styles.card}>
			<img
				src={props.imgSrc}
				alt={props.imgAltText}
				className={styles.pizzaImg}
			/>
			<h2 className={styles.pizzaTitle}>{props.title}</h2>
			<p className={styles.description}>{props.description}</p>
			<CardButton />
		</div>
	);
}
