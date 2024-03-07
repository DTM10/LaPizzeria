import React, { useState } from 'react';
import styles from './CardButton.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function CardButton({ handlePress, text, icon, children }) {
  const [added, setAdded] = useState(false);
  return (
    <button
      className={styles.cardBtn}
      onClick={() => {
        setAdded(true);
        setTimeout(() => {
          setAdded(false);
        }, 2000);
        handlePress();
      }}
    >
      {!added ? (
        <>
          <FontAwesomeIcon icon={icon} className={styles.cartIcon} />
          <p className={styles.btnText}>{text}</p>
        </>
      ) : (
        <>
          <p className={styles.btnText}>ADDED</p>
        </>
      )}
    </button>
  );
}
