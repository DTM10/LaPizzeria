import React, { useContext, useState } from 'react';
import styles from '../styles/pizzaCard.module.css';
import CardButton from './CardButton';
import { CartContext } from '../context/CartContext';
import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons';
import QtyToggle from './QtyToggle';

export function PizzaCard({
	id,
	imgSrc,
	imgAltText,
	title,
	description,
	price,
	specialPrice,
	specialDay
}) {
	const { addCartItems } = useContext(CartContext);
	const [qty, setQty] = useState(0);
	const handleAddition = () => {
		const addingPizza = {
			id: id,
			title: title,
			src: imgSrc,
			price: price,
			specialPrice: specialPrice,
			specialDay: specialDay
		};
		const addingArray = [];
		for (let i = 0; i < qty; i++) {
			addingArray.push(addingPizza);
		}
		addCartItems(addingArray);
		setQty(0);
	};

	const handleIncrease = () => {
		setQty(qty + 1);
	};

	const handleDecrease = () => {
		const newQty = qty - 1 >= 0 ? qty - 1 : 0;
		setQty(newQty);
	};

	return (
		<div className={styles.card}>
			<img src={imgSrc} alt={imgAltText} className={styles.pizzaImg} />
			<h2 className={styles.pizzaTitle}>{title}</h2>
			<p className={styles.description}>{description}</p>
			<div className={styles.qtyContainer}>
				<QtyToggle
					qty={qty}
					handleDecrease={handleDecrease}
					handleIncrease={handleIncrease}
				/>
			</div>
			<CardButton
				handlePress={handleAddition}
				text={'ADD TO CART'}
				icon={faCartArrowDown}
			/>
		</div>
	);
}
