import React, { useContext, useEffect } from 'react';
import styles from './tracker.module.css';
import { AuthContext } from '../../context/AuthContext';
import { getFormattedDate, formatStatusStr } from '../../Helper';
import { OrderInput } from '../OrderInput/OrderInput';

export function Tracker() {
  const {
    pendingOrders,
    forDeliverOrders,
    deliveredOrders,
    fetchOrders,
    userDetails,
    userId,
  } = useContext(AuthContext);

  useEffect(() => {
    if (userId) {
      fetchOrders();
    }
  }, []);
  return userId !== '' ? (
    <div className={styles.tracker}>
      <div className={styles.trackerContainer}>
        <div className={styles.orders}>
          <p className={styles.label}>Order id</p>
          <p className={styles.label}>Date</p>
          <p className={styles.label}>Status</p>
        </div>
        {pendingOrders.length > 0 &&
          pendingOrders.map((order) => {
            return (
              <div className={styles.pendingOrders} key={order.orderId}>
                <div className={styles.orderDetail}>
                  <p className={styles.data}>{order.orderId}</p>
                </div>
                <div className={styles.orderDetail}>
                  <p className={styles.data}>
                    {getFormattedDate(order.timestamp)}
                  </p>
                </div>
                <div className={styles.orderDetail}>
                  <p className={styles.data}>{formatStatusStr(order.status)}</p>
                </div>
              </div>
            );
          })}
        {forDeliverOrders.length > 0 &&
          forDeliverOrders.map((order) => {
            return (
              <div className={styles.pendingOrders} key={order.orderId}>
                <div className={styles.orderDetail}>
                  <p className={styles.data}>{order.orderId}</p>
                </div>
                <div className={styles.orderDetail}>
                  <p className={styles.data}>
                    {getFormattedDate(order.timestamp)}
                  </p>
                </div>
                <div className={styles.orderDetail}>
                  <p className={styles.data}>{formatStatusStr(order.status)}</p>
                </div>
              </div>
            );
          })}
        {deliveredOrders.length > 0 &&
          deliveredOrders.map((order) => {
            return (
              <div className={styles.pendingOrders} key={order.orderId}>
                <div className={styles.orderDetail}>
                  <p className={styles.data}>{order.orderId}</p>
                </div>
                <div className={styles.orderDetail}>
                  <p className={styles.data}>
                    {getFormattedDate(order.timestamp)}
                  </p>
                </div>
                <div className={styles.orderDetail}>
                  <p className={styles.data}>{formatStatusStr(order.status)}</p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  ) : (
    <OrderInput />
  );
}
