import React, { useContext, useEffect } from 'react';
import styles from './tracker.module.css';
import { AuthContext } from '../../context/AuthContext';
import { getFormattedDate } from '../../Helper';

export function Tracker() {
  const { pendingOrders, fetchOrders } = useContext(AuthContext);

  useEffect(() => {
    fetchOrders();
  }, []);
  return (
    <div className={styles.tracker}>
      <div className={styles.trackerContainer}>
        <h1>I am the Tracker</h1>
        {pendingOrders.length > 0 &&
          pendingOrders.map((order) => {
            return (
              <div>
                <p>Order id: {order.orderId}</p>
                <p>Date: {getFormattedDate(order.timestamp)}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
}
