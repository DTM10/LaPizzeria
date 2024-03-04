import React, { useContext, useEffect, useState } from 'react';
import styles from './pizzaCard.module.css';
import CardButton from '../CardButton/CardButton';
import { CartContext } from '../../context/CartContext';
import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons';
import QtyToggle from '../QtyToggle/QtyToggle';

export function PizzaCard({
  id,
  imgSrc,
  imgAltText,
  title,
  description,
  price,
  specialPrice,
  specialDay,
}) {
  const { addCartItems } = useContext(CartContext);
  const [qty, setQty] = useState(1);
  // const [canDescrease, setCanDecrease] = useState(false);

  // useEffect(() => {
  //   setCanDecrease(qty > 1 ? true : false);
  // }, [qty]);

  const handleAddition = () => {
    const addingPizza = {
      id: id,
      title: title,
      src: imgSrc,
      price: price,
      specialPrice: specialPrice,
      specialDay: specialDay,
    };
    const addingArray = [];
    for (let i = 0; i < qty; i++) {
      addingArray.push(addingPizza);
    }
    addCartItems(addingArray);
    setQty(1);
  };

  const handleIncrease = () => {
    setQty(qty + 1);
  };

  const handleDecrease = () => {
    const newQty = qty - 1 >= 1 ? qty - 1 : 1;
    setQty(newQty);
  };

  return (
    <div className={styles.card}>
      <img src={imgSrc} alt={imgAltText} className={styles.pizzaImg} />
      <h2 className={styles.pizzaTitle}>{title}</h2>
      {/* <div className={styles.titleContainer}>

	  </div> */}
      <div className={styles.descriptionContainer}>
        <p className={styles.description}>{description}</p>
      </div>

      <div className={styles.qtyContainer}>
        <QtyToggle
          qty={qty}
          handleDecrease={handleDecrease}
          handleIncrease={handleIncrease}
          canDescrease={qty > 1}
          setQty={setQty}
          canEditValue={true}
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
