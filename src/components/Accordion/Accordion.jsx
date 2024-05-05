import React, { useState } from 'react';
import styles from './Accordion.module.scss';
import {
  getFormattedDate,
  formatStatusStr,
  formatCurrency,
} from '../../Helper';

export default function Accordion({ generalObj, childrenObj }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.accordion}>
      <button
        className={`${styles.accordionBtn} ${isOpen ? styles.openBtn : ''}`}
        onClick={toggle}
      >
        <div className={styles.orderDetail}>
          <p className={styles.data}>
            {getFormattedDate(generalObj.timestamp)}
          </p>
        </div>
        <div className={styles.orderDetail}>
          <p className={styles.data}>{formatStatusStr(generalObj.status)}</p>
        </div>
      </button>
      <div
        className={`${styles.accordionContent} ${isOpen ? styles.open : ''}`}
      >
        <div className={styles.orderDetail}>
          <div className={styles.data}>
            <p className={styles.label}>Order Id:</p>
            <p className={styles.value}>{generalObj.orderId}</p>
          </div>
          {childrenObj.map((pizza, index) => {
            return (
              <div className={styles.pizza} key={`pizza-${index}`}>
                <div className={styles.data}>
                  <p className={styles.label}>Topping:</p>
                  <p className={styles.value}>{pizza.pizzaTitle}</p>
                </div>
                <div className={styles.data}>
                  <p className={styles.label}>Quantity:</p>
                  <p className={styles.value}>{pizza.count}</p>
                </div>
              </div>
            );
          })}
          <div className={styles.data}>
            <p className={styles.label}>Order Grand Total:</p>
            <p className={styles.value}>
              {formatCurrency(generalObj.orderGrandTotal)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
