import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { Home } from './components/Home';
import { Menu } from './components/Menu';
import { Tracker } from './components/Tracker';
import { Login } from './components/Login';
import { Cart } from './components/Cart';
import { CartProvider } from '../src/context/CartContext';
// import Header from './components/Header';
import Layout from './components/Layout';

function App() {
	const [cartItems, setCartItems] = useState([]);
	// const [orders, setOrders] = useState([]);

	const addCartItems = (items) => {
		const newCartItems = [...cartItems, ...items];
		setCartItems(newCartItems);
	};

	// return (
	// 	<div className="App">
	// 		<Router>
	// 			<Routes>
	// 			<Header cartItems={cartItems} setCartItems={setCartItems} />
	// 				<Route path="/" element={<Home cartItems={cartItems} />} />
	// 				<Route
	// 					path="/menu"
	// 					element={<Menu addCartItems={addCartItems} cartItems={cartItems} />}
	// 				/>
	// 				<Route path="/login" element={<Login cartItems={cartItems} />} />
	// 				<Route path="/tracker" element={<Tracker cartItems={cartItems} />} />
	// 				<Route path="/cart" element={<Cart cartItems={cartItems} />} />
	// 			</Routes>
	// 		</Router>
	// 	</div>
	// );

	return (
		<div className="App">
			<CartProvider>
				<Router>
					<Routes>
						<Route path="/" element={<Layout />}>
							<Route index element={<Home />} />
							<Route
								path="menu"
								element={
									<Menu addCartItems={addCartItems} cartItems={cartItems} />
								}
							/>
							<Route path="login" element={<Login cartItems={cartItems} />} />
							<Route
								path="tracker"
								element={<Tracker cartItems={cartItems} />}
							/>
							<Route path="cart" element={<Cart cartItems={cartItems} />} />
						</Route>
					</Routes>
				</Router>
			</CartProvider>
		</div>
	);
}

export default App;
