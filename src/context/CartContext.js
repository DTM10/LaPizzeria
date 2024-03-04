import React, { createContext, useState, useEffect } from 'react';
import { specialsCheck, calculateTotal } from '../Helper';

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
		const organized = specialsCheck(weekDay, cartItems, sundaySpecial);
		console.log('organized is: ', organized);
		setOrganizedPizzas(organized);
	},[cartItems, weekDay, sundaySpecial])

	useEffect(()=>{
		const totals = calculateTotal(organizedPizzas);
		setTotalsObj(totals);
	}, [organizedPizzas, weekDay])

	useEffect(()=>{
		setCartAmount(totalsObj.grandTotal);
	},[totalsObj, weekDay])

	const addCartItems = (item) => {
		const day = new Date().getDay();
		updateWeekDay(day);
		const index = cartItems.findIndex((pizzas) => pizzas.id === item.id);
		console.log('index in addCartItems is: ', index);
		if (index >= 0 ) { 
			const tempCart = [...cartItems];
			console.log('prevCount: ', tempCart[index].count);
			tempCart[index].count += item.count;
			console.log('newCount: ', tempCart[index].count);
			setCart(tempCart);
		} else {
			console.log('pizza not previously included');
			setCart([...cartItems, item]);
		}
	};


	const removeCartItem = (id) => {
		const index = cartItems.findIndex((pizzas) => pizzas.id === id);
		const newCart = [...cartItems];
		newCart[index].count -= 1;
		if (newCart[index].count < 1) {
			newCart.splice(index, 1);
		}
		setCart(newCart);
	};

	const increaseItemCount = (id) => {
		const index = cartItems.findIndex((pizzas) => pizzas.id === id);
		const newCart = [...cartItems];
		newCart[index].count += 1;
		setCart(newCart);
	};

	const setCartItemQty = (newQty, id) => {
		const index = cartItems.findIndex((pizzas) => pizzas.id === id);
		const newCart = [...cartItems];
		newCart[index].count = newQty;
		setCart(newCart);
	};

	const checkIfZero = (id) => {
		const index = cartItems.findIndex((pizzas) => pizzas.id === id);
		if (cartItems[index].count < 1) {
			const newCart = [...cartItems];
			newCart.splice(index, 1);
			setCart(newCart);
		}
		console.log('checked if it was 0');
	}

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
				setCart,
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
				organizedPizzas,
				setCartItemQty,
				checkIfZero
			}}
		>
			{children}
		</CartContext.Provider>
	);
}

export { CartProvider, CartContext };
