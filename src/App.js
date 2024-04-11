import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './components/Home/Home';
import { Menu } from './components/Menu/Menu';
import { Tracker } from './components/Tracker/Tracker';
import { Login } from './components/Login/Login';
import { Cart } from './components/Cart/Cart';
import { CartProvider } from '../src/context/CartContext';
import { AuthProvider } from '../src/context/AuthContext';
import { Register } from './components/Register/Register';
import PageNotFound from './components/PageNotFound/PageNotFound';
import Layout from './components/Layout';
import './App.scss';

function App() {
  return (
    <AuthProvider>
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
                <Route path="register" element={<Register />} />
                <Route path="*" element={<PageNotFound />} />
              </Route>
            </Routes>
          </Router>
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
