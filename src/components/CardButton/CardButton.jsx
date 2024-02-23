import React from 'react';
import styles from './cardButton.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function CardButton({ handlePress, text, icon }) {
  return (
    <button
      className={styles.cardBtn}
      onClick={() => {
        handlePress();
      }}
    >
      <FontAwesomeIcon icon={icon} className={styles.cartIcon} />
      <p className={styles.btnText}>{text}</p>
    </button>
  );
}
