import React, { useContext, useState } from 'react';
import CardButton from '../CardButton/CardButton';
import { CartContext } from '../../context/CartContext';
import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons';
import QtyToggle from '../QtyToggle/QtyToggle';
import styles from './PizzaCard.module.scss';

export function PizzaCard({
  id,
  imgSrc,
  imgAltText,
  title,
  description,
  price,
  regularPrice,
  specialPrice,
  specialDay,
}) {
  const { addCartItems } = useContext(CartContext);
  const [qty, setQty] = useState(1);

  const handleAddition = () => {
    const addingPizza = {
      id: id,
      title: title,
      src: imgSrc,
      price: price,
      regularPrice: regularPrice,
      specialPrice: specialPrice,
      specialDay: specialDay,
      count: qty,
    };
    addCartItems(addingPizza);
    setQty(1);
  };

  const handleIncrease = () => {
    setQty(qty + 1);
  };

  const handleDecrease = () => {
    const newQty = qty - 1 >= 1 ? qty - 1 : 1;
    setQty(newQty);
  };

  const checkIfZero = () => {
    if (qty < 1 || NaN) {
      setQty(1);
    }
  };

  return (
    <div className={styles.card}>
      <img src={imgSrc} alt={imgAltText} />
      <h2>{title}</h2>

      <div className={styles.descriptionContainer}>
        <p>{description}</p>
      </div>

      <div className={styles.qtyContainer}>
        <QtyToggle
          qty={qty}
          handleDecrease={handleDecrease}
          handleIncrease={handleIncrease}
          canDescrease={qty > 1}
          setQty={setQty}
          canEditValue={true}
          param={id}
          checkIfZero={checkIfZero}
        />
      </div>
      <CardButton
        handlePress={handleAddition}
        text={'ADD TO CART'}
        icon={faCartArrowDown}
      ></CardButton>
    </div>
  );
}
