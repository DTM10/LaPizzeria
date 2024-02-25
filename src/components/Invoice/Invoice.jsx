import { formatCurrency } from '../../Helper';
import styles from './invoice.module.css';
import CardButton from '../CardButton/CardButton';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Invoice({ setCheckingOut, checkingOut, totals }) {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);

  const handleCheckout = () => {
    if (isLoggedIn) {
      setCheckingOut(!checkingOut);
    } else {
      navigate('/login');
    }
  };

  return (
    <div className={styles.invoice}>
      <div className={styles.invoiceContainer}>
        <p children className={styles.priceDetail}>
          Total Before Tax: {formatCurrency(totals.totalBTax)}
        </p>
        <p className={styles.priceDetail}>Tax: {formatCurrency(totals.tax)}</p>

        <p className={styles.grandTotal}>
          Grand Total: {formatCurrency(totals.grandTotal)}
        </p>
        <div className={styles.btnContainer}>
          <CardButton
            handlePress={handleCheckout}
            text={'CHECKOUT'}
            icon={faCartShopping}
          />
        </div>
      </div>
    </div>
  );
}
