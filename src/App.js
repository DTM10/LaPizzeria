import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './components/Home';
import { Menu } from './components/Menu';
import { Tracker } from './components/Tracker';
import { Login } from './components/Login';
import { Cart } from './components/Cart';
import { CartProvider } from '../src/context/CartContext';
// import Header from './components/Header';
import Layout from './components/Layout';

function App() {
	return (
		<div className="App">
			<CartProvider>
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
			</CartProvider>
		</div>
	);
}

export default App;
