import React, { useContext, useEffect, useState } from 'react';
import styles from '../styles/cart.module.css';
import CartCard from './CartCard';
import CartHeader from './CartHeader';
// import Invoice from './Invoice';
import { CartContext } from '../context/CartContext';
import { specialsCheck, aggregateItems } from '../Helper';
import CardButton from './CardButton';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

export function Cart() {
	const { cartItems } = useContext(CartContext);
	const [organizedPizzas, setOrganizedPizzas] = useState([]);
	const [weekDay, setWeekDay] = useState(7);
	// const [checkingOut, setCheckingOut] = useState(false);

	const updateDay = () => {
		setInterval(() => {
			const day = new Date().getDay();
			setWeekDay(day);
		}, 60000);
	};

	useEffect(() => {
		const day = new Date().getDay();
		setWeekDay(day);
		const aggregatedItems = aggregateItems(cartItems);
		const organized = specialsCheck(day, aggregatedItems);

		updateDay();
		setOrganizedPizzas(organized);
	}, [cartItems, weekDay]);

	const handleCheckout = () => {
		// Make the backgroung blurried
		// Set checkingout to show the checkout modal screen
	};

	return (
		<div className={styles.cart}>
			{cartItems.length > 0 && (
				<div className={styles.cartContainer}>
					<CartHeader />
					<div className={styles.cardsContainer}>
						{organizedPizzas.map((pizza) => (
							<CartCard
								qty={pizza.count}
								pizzaName={pizza.title}
								pizzaImg={pizza.src}
								id={pizza.id}
								key={pizza.id}
								priceDescrip={pizza.priceDesc}
								subTotal={pizza.subTotal}
								price={pizza.price}
							/>
						))}
					</div>
					<div className={styles.btnContainer}>
						<CardButton
							handlePress={handleCheckout}
							text={'CHECKOUT'}
							icon={faCartShopping}
						/>
					</div>
				</div>
			)}
		</div>
	);
}

/* 
			- CHANGE THE LOGIC TO CREATE THE CARTCARD -> ADD THE SUBTOTAL ON THE CART
				- NEED TO CHECK THE SPECIAL PRICE
			- PUT THE INVOICE IN ITS OWN COMPONENT THAT WILL BE SHOWN IN A DIFFERENT ROUTE,
			WHEN THE BUTTON CHECKOUT IS CLICKED.
			IN THE INVOICE COMPONENT WE CREATE A BUTTON TO PAY, THAT SHOULD BE INTEGRATED WITH THE 
			PAYMENT FUNCTIONALITY. 
			
			- ADD BUTTON TO CLEAR THE CART
			- FIELD AND BUTTON TO TIP (CHANGE THE HARDCODED 10 DOLARS TIP.)

			*/
