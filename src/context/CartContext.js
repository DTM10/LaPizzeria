import React, {
  createContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import { specialsCheck, calculateTotal, getSundaySpecial } from '../Helper';

import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const CartContext = createContext();

function CartProvider({ children }) {
  const [cartItems, setCart] = useState([]);
  const [cartAmount, setCartAmount] = useState(0);
  const [weekDay, setWeekDay] = useState(new Date().getDay());
  const [sundaySpecial, setSundaySpecial] = useState({});
  const [totalsObj, setTotalsObj] = useState({});
  const [organizedPizzas, setOrganizedPizzas] = useState([]);
  const [timerId, setTimerId] = useState(null);
  const [pizzas, setPizzas] = useState([]);

  console.log('CartContext');
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

  useEffect(() => {
    console.log('CartContext empty dep useEffect');

    const getSpecial = async () => {
      const special = await getSundaySpecial();
      setSundaySpecial(special);
    };
    if (Object.keys(sundaySpecial).length === 0) {
      console.log('getSpecial if !sundaySpecial');
      getSpecial();
    }
    if (pizzas.length === 0) {
      console.log('fetchPizzasInfo if !pizzas');
      fetchPizzasInfo();
    }
  }, []);

  const timeoutForDayChange = useCallback(() => {
    const now = new Date();
    const tomorrow = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1
    );
    tomorrow.setHours(0, 0, 0, 0);
    const delay = tomorrow - now;
    const id = setTimeout(() => {
      setWeekDay(new Date().getDay());
    }, delay);

    setTimerId(id);
  }, []);

  const updateWeekdayTimer = useMemo(() => {
    console.log('CartContext createNew Timer useMemo');
    if (timerId !== null) {
      clearTimeout(timerId);
    }
    timeoutForDayChange();
  }, [weekDay]);

  useEffect(() => {
    console.log('CartContext empty dep useEffect');
    const organized = specialsCheck(
      new Date().getDay(),
      cartItems,
      sundaySpecial
    );
    setOrganizedPizzas(organized);
    const totals = calculateTotal(organized);
    setTotalsObj(totals);
    setCartAmount(totals.grandTotal);
  }, [cartItems, weekDay]);

  const addCartItems = useCallback((item) => {
    const index = cartItems.findIndex((pizzas) => pizzas.id === item.id);
    if (index >= 0) {
      const tempCart = [...cartItems];
      tempCart[index].count += item.count;
      setCart(tempCart);
    } else {
      setCart([...cartItems, item]);
    }
  }, []);

  const removeCartItem = useCallback((id) => {
    const index = cartItems.findIndex((pizzas) => pizzas.id === id);
    const newCart = [...cartItems];
    newCart[index].count -= 1;
    if (newCart[index].count < 1) {
      newCart.splice(index, 1);
    }
    setCart(newCart);
  }, []);

  const increaseItemCount = useCallback((id) => {
    const index = cartItems.findIndex((pizzas) => pizzas.id === id);
    const newCart = [...cartItems];
    newCart[index].count += 1;
    setCart(newCart);
  }, []);

  const setCartItemQty = useCallback((newQty, id) => {
    const index = cartItems.findIndex((pizzas) => pizzas.id === id);
    const newCart = [...cartItems];
    newCart[index].count = newQty;
    setCart(newCart);
  }, []);

  const checkIfZero = useCallback((id) => {
    const index = cartItems.findIndex((pizzas) => pizzas.id === id);
    if (cartItems[index].count < 1) {
      const newCart = [...cartItems];
      newCart.splice(index, 1);
      setCart(newCart);
    }
  }, []);

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
        checkIfZero,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export { CartProvider, CartContext };
