import React, { createContext, useState, useEffect } from 'react';
import { specialsCheck, aggregateItems, calculateTotal } from '../Helper';

const CartContext = createContext();

function CartProvider({ children }) {
	const [cartItems, setCart] = useState([]);
	const [cartAmount, setCartAmount] = useState(0);
	const [weekDay, setWeekDay] = useState(new Date().getDay());
	const [updateTimer, setupdateTimer] = useState([]);
	const [sundaySpecial, setSundaySpecial] = useState({});
	const [totalsObj, setTotalsObj] = useState({});
	const [organizedPizzas, setOrganizedPizzas] = useState([]);

	useEffect(()=>{
		const aggregatedItems = aggregateItems(cartItems);
		const organized = specialsCheck(weekDay, aggregatedItems, sundaySpecial);
		setOrganizedPizzas(organized);
	},[cartItems])

	useEffect(()=>{
		const totals = calculateTotal(organizedPizzas);
		setTotalsObj(totals);
	}, [organizedPizzas])

	useEffect(()=>{
		setCartAmount(totalsObj.grandTotal);
	},[totalsObj])

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
				setSundaySpecial,
				totalsObj,
				organizedPizzas
			}}
		>
			{children}
		</CartContext.Provider>
	);
}

export { CartProvider, CartContext };
