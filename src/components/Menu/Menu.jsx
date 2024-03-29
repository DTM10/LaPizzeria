import React, { useState, useEffect, useContext } from 'react';
import styles from './Menu.module.scss';
import { PizzaCard } from '../PizzaCard/PizzaCard';
import { CartContext } from '../../context/CartContext';

export function Menu() {
  const { pizzas } = useContext(CartContext);

  return (
    <div className={styles.menu}>
      <div className={styles.cardsContainer}>
        {pizzas.map((pizza) => {
          return (
            <PizzaCard
              id={pizza.id}
              imgSrc={pizza.src}
              title={pizza.title}
              description={pizza.description}
              key={pizza.id}
              price={pizza.price}
              regularPrice={pizza.regularPrice}
              specialPrice={pizza.specialPrice}
              specialDay={pizza.specialDay}
            />
          );
        })}
      </div>
    </div>
  );
}
