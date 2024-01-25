import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { Home } from './components/Home';
import { Menu } from './components/Menu';
import { Tracker } from './components/Tracker';
import { Login } from './components/Login';
import { Cart } from './components/Cart';

function App() {
	const [cartItems, setCartItems] = useState([]);
	const [orders, setOrders] = useState([]);

	const addCartItems = (items) => {
		const newCartItems = [...cartItems, ...items];
		setCartItems(newCartItems);
	};

	return (
		<div className="App">
			<Router>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/menu" element={<Menu addCartItems={addCartItems} />} />
					<Route path="/tracker" element={<Tracker />} />
					<Route path="/login" element={<Login />} />
					<Route path="/cart" element={<Cart cartItems={cartItems} />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
