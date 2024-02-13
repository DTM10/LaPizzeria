import React, { createContext, useState } from 'react';

const CartContext = createContext();

function CartProvider({ children }) {
	const [cartItems, setCart] = useState([]);
	const [cartAmount, setCartAmount] = useState(0);
	const [weekDay, setWeekDay] = useState(new Date().getDay());
	const [updateTimer, setupdateTimer] = useState([]);
	const [sundaySpecial, setSundaySpecial] = useState({});

	const addCartItems = (item) => {
		setCart([...cartItems, ...item]);
	};

	const removeCartItem = (id) => {
		const index = cartItems.findIndex((pizzas) => pizzas.id === id);
		const newCart = [...cartItems];
		newCart.splice(index, 1);
		setCart(newCart);
	};

	const increaseItemCount = (id) => {
		const index = cartItems.findIndex((pizzas) => pizzas.id === id);
		const newCart = [...cartItems, cartItems[index]];
		setCart(newCart);
	};

	const timeUntilMidnight = () => {
		const now = new Date();
		const midnight = new Date(
			now.getFullYear(),
			now.getMonth(),
			now.getDate() + 1,
			0,
			0,
			0
		);
		return midnight.getTime() - now.getTime();
	};

	const updateWeekDay = (day) => {
		if (day !== weekDay) {
			setWeekDay(day);
		}
	};

	const scheduleWeekDayUpdate = () => {
		if (updateTimer.length === 0) {
			const timer = setTimeout(() => {
				const day = new Date().getDay();
				updateWeekDay(day);
			}, timeUntilMidnight());
			setupdateTimer(timer);
		}
	};

	return (
		<CartContext.Provider
			value={{
				cartItems,
				addCartItems,
				removeCartItem,
				increaseItemCount,
				cartAmount,
				setCartAmount,
				weekDay,
				scheduleWeekDayUpdate,
				sundaySpecial,
				setSundaySpecial
			}}
		>
			{children}
		</CartContext.Provider>
	);
}

export { CartProvider, CartContext };
