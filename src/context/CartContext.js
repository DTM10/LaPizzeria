import React, { createContext, useState } from 'react';

const CartContext = createContext();

function CartProvider({ children }) {
	const [cartItems, setCart] = useState([]);

	const addCartItems = (item) => {
		console.log('item is: ', item);
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

	return (
		<CartContext.Provider
			value={{ cartItems, addCartItems, removeCartItem, increaseItemCount }}
		>
			{children}
		</CartContext.Provider>
	);
}

export { CartProvider, CartContext };
