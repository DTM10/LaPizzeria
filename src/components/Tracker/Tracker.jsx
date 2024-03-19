import React, { useContext, useEffect } from 'react';
import styles from './Tracker.module.scss';
import { AuthContext } from '../../context/AuthContext';
import { OrderInput } from '../OrderInput/OrderInput';
import Accordion from '../Accordion/Accordion';

export function Tracker() {
  const {
    pendingOrders,
    forDeliverOrders,
    deliveredOrders,
    fetchOrders,
    userDetails,
    userId,
    isLoggedIn,
  } = useContext(AuthContext);

  useEffect(() => {
    console.log('userDetails: ', userDetails);
    if (userId) {
      fetchOrders();
    }
  }, []);
  return isLoggedIn ? (
    <div className={styles.tracker}>
      <div className={styles.trackerContainer}>
        <h2>{userDetails.firstName}, your orders are: </h2>
        {/* <div className={styles.orders}>
          <div className={styles.headerItem}>
            <p className={styles.label}>Date</p>
          </div>
          <div className={styles.headerItem}></div>
          <p className={styles.label}>Status</p>
        </div> */}
        {pendingOrders.length > 0 &&
          pendingOrders.map((order) => {
            return (
              <Accordion
                generalObj={{
                  orderId: order.orderId,
                  timestamp: order.timestamp,
                  status: order.status,
                  orderGrandTotal: order.grandTotal,
                }}
                childrenObj={order.orderDetails}
              />
            );
          })}
        {forDeliverOrders.length > 0 &&
          forDeliverOrders.map((order) => {
            return (
              <Accordion
                generalObj={{
                  orderId: order.orderId,
                  timestamp: order.timestamp,
                  status: order.status,
                  orderGrandTotal: order.grandTotal,
                }}
                childrenObj={order.orderDetails}
              />
            );
          })}
        {deliveredOrders.length > 0 &&
          deliveredOrders.map((order) => {
            return (
              <Accordion
                generalObj={{
                  orderId: order.orderId,
                  timestamp: order.timestamp,
                  status: order.status,
                  orderGrandTotal: order.grandTotal,
                }}
                childrenObj={order.orderDetails}
              />
            );
          })}
      </div>
    </div>
  ) : (
    <OrderInput />
  );
}
