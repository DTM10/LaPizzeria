import React, { useState, useContext } from 'react';
import { GeneralButton } from '../GeneralButton/GeneralButton';
import { AuthContext } from '../../context/AuthContext';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import styles from './orderInput.module.css';

export function OrderInput() {
  const [orderNum, setOrderNum] = useState('');
  const { fetchOrder } = useContext(AuthContext);
  return (
    <div className={styles.orderInput}>
      <div className={styles.orderInputContainer}>
        <label className={styles.label}>
          Enter your order number:
          <input
            className={styles.input}
            type="text"
            value={orderNum}
            onChange={(e) => {
              setOrderNum(e.target.value);
            }}
          />
        </label>
        <div className={styles.btnContainer}>
          <GeneralButton
            action={() => {
              fetchOrder(orderNum);
            }}
            btnText="SEARCH"
            icon={faMagnifyingGlass}
          />
        </div>
      </div>
    </div>
  );
}
