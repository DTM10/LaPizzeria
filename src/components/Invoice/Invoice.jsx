import { formatCurrency } from '../../Helper';
import styles from './Invoice.module.scss';
import {
  faCartShopping,
  faArrowRightToBracket,
} from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GeneralButton } from '../GeneralButton/GeneralButton';

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
      <div className={styles.startImgContainer}>
        <img
          src="./images/Rucola-Prosciutto.webp"
          alt="Rucola-Prosciutto-pizza"
          className={styles.pizzaImg}
        />
      </div>
      <div className={styles.invoiceContainer}>
        <div className={styles.priceContainer}>
          <div className={styles.detailsContainer}>
            <p className={styles.priceDetail}>
              Total Before Tax: {formatCurrency(totals.totalBTax)}
            </p>
            <p className={styles.priceDetail}>
              Tax: {formatCurrency(totals.tax)}
            </p>
          </div>
          <p className={styles.grandTotal}>
            Grand Total: {formatCurrency(totals.grandTotal)}
          </p>
        </div>
        <div className={styles.btnContainer}>
          {isLoggedIn ? (
            <GeneralButton
              action={handleCheckout}
              btnText={'CHECKOUT'}
              icon={faCartShopping}
            />
          ) : (
            <GeneralButton
              action={handleCheckout}
              btnText={'LOGIN'}
              icon={faArrowRightToBracket}
            />
          )}
        </div>
      </div>
      <div className={styles.startImgContainer}>
        <img
          src="./images/Marguerita.webp"
          alt="Marguerita-pizza"
          className={styles.pizzaImg}
        />
      </div>
    </div>
  );
}
