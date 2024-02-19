import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './components/Home/Home';
import { Menu } from './components/Menu/Menu';
import { Tracker } from './components/Tracker/Tracker';
import { Login } from './components/Login/Login';
import { Cart } from './components/Cart/Cart';
import { CartProvider } from '../src/context/CartContext';
// import Header from './components/Header';
import Layout from './components/Layout';

function App() {
	return (
		<CartProvider>
			<div className="App">
				<Router>
					<Routes>
						<Route path="/" element={<Layout />}>
							<Route index element={<Home />} />
							<Route path="menu" element={<Menu />} />
							<Route path="login" element={<Login />} />
							<Route path="tracker" element={<Tracker />} />
							<Route path="cart" element={<Cart />} />
						</Route>
					</Routes>
				</Router>
			</div>
		</CartProvider>
	);
}

export default App;
