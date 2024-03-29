import React, { createContext, useState, useEffect } from 'react';
import { specialsCheck, calculateTotal, getSundaySpecial } from '../Helper';

import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const CartContext = createContext();

function CartProvider({ children }) {
	const [cartItems, setCart] = useState([]);
	const [cartAmount, setCartAmount] = useState(0);
	const [weekDay, setWeekDay] = useState(7);
	const [sundaySpecial, setSundaySpecial] = useState({});
	const [totalsObj, setTotalsObj] = useState({});
	const [organizedPizzas, setOrganizedPizzas] = useState([]);
	const [timerId, setTimerId] = useState(null);
	const [pizzas, setPizzas] = useState([]);

	useEffect(()=>{
		const getSpecial = async () => {
			const special = await getSundaySpecial();
			setSundaySpecial(special);
		}
		getSpecial();
		fetchPizzasInfo();
	},[])
	
	useEffect(()=>{
		setWeekDay(new Date().getDay());
		if (timerId !== null) {
			clearTimeout(timerId);
		} 
		timeoutForDayChange(); 
	}, [weekDay])
	
	useEffect(()=>{
		setWeekDay(new Date().getDay());
		const organized = specialsCheck(new Date().getDay(), cartItems, sundaySpecial);
		setOrganizedPizzas(organized);
	},[cartItems, weekDay, sundaySpecial]);

	useEffect(()=>{
		const totals = calculateTotal(organizedPizzas);
		setTotalsObj(totals);
	}, [organizedPizzas, weekDay])

	useEffect(()=>{
		setCartAmount(totalsObj.grandTotal);
	},[totalsObj, weekDay])

	const addCartItems = (item) => {
		const index = cartItems.findIndex((pizzas) => pizzas.id === item.id);
		if (index >= 0 ) { 
			const tempCart = [...cartItems];
			tempCart[index].count += item.count;
			setCart(tempCart);
		} else {
			setCart([...cartItems, item]);
		}
	};

	const timeoutForDayChange = () => {
		const now = new Date();
		const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
		tomorrow.setHours(0,0,0,0);
		const delay = tomorrow - now;
		const id =  setTimeout(() => {
			setWeekDay(new Date().getDay());
		}, delay);

		setTimerId(id);
	}


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
	}

	const fetchPizzasInfo = async () => {
		const tempPizzas = [];
		const querySnapshot = await getDocs(collection(db, 'Pizzas'));
		querySnapshot.forEach((doc) => {
		  tempPizzas.push({
			id: doc.id,
			title: doc.data().title,
			description: doc.data().description,
			src: doc.data().src,
			price: doc.data().price,
			regularPrice: doc.data().regularPrice,
			specialPrice: doc.data().specialPrice,
			specialDay: doc.data().specialDay,
		  });
		});
		setPizzas(tempPizzas);
	  };

	return (
		<CartContext.Provider
			value={{
				pizzas,
				cartItems,
				setCart,
				addCartItems,
				removeCartItem,
				increaseItemCount,
				cartAmount,
				setCartAmount,
				weekDay,
				sundaySpecial,
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
