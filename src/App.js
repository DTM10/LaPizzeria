import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './components/Home';
import { Menu } from './components/Menu';
import { Tracker } from './components/Tracker';
import { Login } from './components/Login';
import { Cart } from './components/Cart';

function App() {
	return (
		<div className="App">
			<Router>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/menu" element={<Menu />} />
					<Route path="/tracker" element={<Tracker />} />
					<Route path="/login" element={<Login />} />
					<Route path="/cart" element={<Cart />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
