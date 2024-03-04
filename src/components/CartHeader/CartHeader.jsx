import styles from './cartHeader.module.css';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

export default function CartHeader() {
  const { userDetails, isLoggedIn } = useContext(AuthContext);

  console.log(userDetails, isLoggedIn);
  return (
    <div className={styles.cartHeader}>
      <div className={styles.cartHeaderContainer}>
        {isLoggedIn ? (
          <p className={styles.label}>{userDetails.firstName}'s order</p>
        ) : (
          <p className={styles.label}>Order</p>
        )}
      </div>
    </div>
  );
}
