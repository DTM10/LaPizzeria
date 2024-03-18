import React, { useContext } from 'react';
import styles from './CartCard.module.scss';
import { CartContext } from '../../context/CartContext';
import QtyToggle from '../QtyToggle/QtyToggle';

export default function CartCard({
  qty,
  pizzaName,
  pizzaImg,
  imgAltText,
  id,
  pizzaDesc,
  subTotal,
  price,
}) {
  const { increaseItemCount, removeCartItem, setCartItemQty, checkIfZero } =
    useContext(CartContext);

  return (
    <div className={styles.cartCard}>
      <div className={styles.cardContainer}>
        <div
          className={
            pizzaDesc === 'Regular'
              ? styles.priceDescrip
              : styles.specialPriceDescrip
          }
        >
          <p>{pizzaDesc}</p>
        </div>
        <div className={styles.pizza}>
          <div className={styles.imgContainer}>
            <img src={pizzaImg} alt={imgAltText} className={styles.pizzaImg} />
          </div>
        </div>
        <div className={styles.pizzaQty}>
          <p className={styles.pizzaName}>{pizzaName}</p>
          <QtyToggle
            handleDecrease={removeCartItem}
            handleIncrease={increaseItemCount}
            qty={qty}
            param={id}
            canDescrease={true}
            setQty={setCartItemQty}
            checkIfZero={checkIfZero}
          />
        </div>
        <div className={styles.price}>
          <div>
            <p className={styles.label}>Price:</p>

            {/* <p className={styles.priceDescrip}>{pizzaDesc}</p> */}

            <p>${price}.00</p>
          </div>
          <div>
            <p className={styles.label}>Sub-total:</p>
            <p>${subTotal}.00</p>
          </div>
        </div>
      </div>
    </div>
  );
}
