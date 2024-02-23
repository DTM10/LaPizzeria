import React, { useContext, useEffect, useState } from 'react';
import styles from './cart.module.css';
import CartCard from '../CartCard/CartCard';
import CartHeader from '../CartHeader/CartHeader';
import Invoice from '../Invoice/Invoice';
import Checkout from '../Checkout/Checkout';
import { CartContext } from '../../context/CartContext';

export function Cart() {
  const { cartItems, weekDay, organizedPizzas, totalsObj } =
    useContext(CartContext);
  const [checkingOut, setCheckingOut] = useState(false);

  return (
    <div className={styles.totalContainer}>
      {checkingOut && (
        <Checkout
          subTotal={totalsObj.totalBTax}
          taxAmount={totalsObj.tax}
          grandTotal={totalsObj.grandTotal}
          setCheckingOut={setCheckingOut}
          checkingOut={checkingOut}
        />
      )}
      <div className={checkingOut ? styles.cartCheckingOut : styles.cart}>
        {cartItems.length > 0 && (
          <div className={styles.cartContainer}>
            <CartHeader />
            <div className={styles.cardsContainer}>
              {organizedPizzas.map((pizza) => (
                <CartCard
                  qty={pizza.count}
                  pizzaName={pizza.title}
                  pizzaImg={pizza.src}
                  id={pizza.id}
                  key={pizza.id}
                  priceDescrip={pizza.priceDesc}
                  subTotal={pizza.subTotal}
                  price={pizza.price}
                />
              ))}
            </div>
          </div>
        )}
        {cartItems.length > 0 && (
          <Invoice
            weekDay={weekDay}
            setCheckingOut={setCheckingOut}
            checkingOut={checkingOut}
            totals={totalsObj}
            orderDetails={organizedPizzas}
          />
        )}
      </div>
    </div>
  );
}

/* 
	 		
	- ADD BUTTON TO CLEAR THE CART
	
*/
