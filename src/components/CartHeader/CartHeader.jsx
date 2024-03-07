import styles from './CartHeader.module.scss';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

export default function CartHeader() {
  const { userDetails, isLoggedIn } = useContext(AuthContext);
  return (
    <div className={styles.cartHeader}>
      <div className={styles.cartHeaderContainer}>
        {isLoggedIn ? (
          <p className={styles.label}>{userDetails.firstName}'s Order</p>
        ) : (
          <p className={styles.label}>Order</p>
        )}
      </div>
    </div>
  );
}
