import React from 'react';
import { formatCurrency } from '../../Helper';
import styles from './checkout.module.css';
import CardButton from '../CardButton/CardButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faX } from '@fortawesome/free-solid-svg-icons';

export default function Invoice({
  subTotal,
  taxAmount,
  grandTotal,
  setCheckingOut,
  checkingOut,
}) {
  const handleCancel = () => {
    setCheckingOut(!checkingOut);
  };

  const handlePlaceOrder = () => {
    console.log('handlePlaceOrder');
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
            Total Before Tax: {formatCurrency(subTotal)}
          </p>
          <p className={styles.priceDetail}>Tax: {formatCurrency(taxAmount)}</p>

          <p className={styles.grandTotal}>
            Grand Total: {formatCurrency(grandTotal)}
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
