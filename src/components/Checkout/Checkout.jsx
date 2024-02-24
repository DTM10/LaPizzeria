import React, { useContext, useState } from 'react';
import { formatCurrency } from '../../Helper';
import styles from './checkout.module.css';
import CardButton from '../CardButton/CardButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faX } from '@fortawesome/free-solid-svg-icons';
import { collection, addDoc, doc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { AuthContext } from '../../context/AuthContext';
import { CartContext } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function Invoice({ setCheckingOut }) {
  const { userId, fetchOrders } = useContext(AuthContext);
  const { organizedPizzas, totalsObj, setCart } = useContext(CartContext);
  const [orderNumber, setOrderNum] = useState('');
  // const [orderPlaced, setOrderPlaced] = useState(false);

  const navigate = useNavigate();

  const handleCancel = () => {
    setCheckingOut(false);
  };

  const handlePlaceOrder = () => {
    const orderDetails = organizedPizzas.map((pizza) => {
      return {
        count: pizza.count,
        pizzaId: pizza.id,
        pizzaTitle: pizza.title,
        pizzaSubTotal: Math.round(pizza.subTotal * 100) / 100,
      };
    });
    const timestamp = new Date().getTime();
    const userDocRef = doc(db, 'users', userId);

    const ordersCollectionRef = collection(userDocRef, 'orders');

    addDoc(ordersCollectionRef, {
      subTotal: Math.round(totalsObj.totalBTax * 100) / 100,
      taxAmount: Math.round(totalsObj.tax * 100) / 100,
      grandTotal: Math.round(totalsObj.grandTotal * 100) / 100,
      timestamp: timestamp,
      orderDetails: orderDetails,
      status: 'pending',
    })
      .then((docRef) => {
        console.log('New order added with ID: ', docRef.id);
        setOrderNum(docRef.id);
        setCart([]);
        fetchOrders();
        setCheckingOut(false);
        navigate('/tracker');
      })
      .catch((e) => {
        console.log('Error adding order: ', e);
      });
  };

  return (
    <div className={styles.checkout}>
      <div className={styles.checkoutContainer}>
        <div className={styles.closeBtnContainer}>
          <button
            className={styles.modalCloseBtn}
            onClick={handleCancel}
            icon={faX}
          >
            <FontAwesomeIcon icon={faX} className={styles.closeBtnIcon} />
          </button>
        </div>

        <div className={styles.priceDetailsContainer}>
          <p children className={styles.priceDetail}>
            Total Before Tax: {formatCurrency(totalsObj.totalBTax)}
          </p>
          <p className={styles.priceDetail}>
            Tax: {formatCurrency(totalsObj.tax)}
          </p>

          <p className={styles.grandTotal}>
            Grand Total: {formatCurrency(totalsObj.grandTotal)}
          </p>
        </div>

        <div className={styles.btnContainer}>
          <CardButton
            handlePress={handlePlaceOrder}
            text={'PLACE ORDER'}
            icon={faCartShopping}
          />
        </div>
      </div>
    </div>
  );
}
