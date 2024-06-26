import React, { useContext } from 'react';
import styles from './Tracker.module.scss';
import { AuthContext } from '../../context/AuthContext';
import NotLoggedIn from '../NotLoggedIn/NotLoggedIn';
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

  return isLoggedIn ? (
    <div className={styles.tracker}>
      <div className={styles.trackerContainer}>
        <h2>{userDetails.firstName}, your orders are: </h2>
        {pendingOrders.length > 0 &&
          pendingOrders.map((order) => {
            return (
              <Accordion
                key={order.orderId}
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
                key={order.orderId}
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
                key={order.orderId}
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
    <NotLoggedIn />
  );
}
