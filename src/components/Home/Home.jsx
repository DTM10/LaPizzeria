import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import styles from './Home.module.scss';
import Carousel from '../Carousel/Carousel';
import { CartContext } from '../../context/CartContext';
import { formatCurrency, getWeekDayStr } from '../../Helper';

export function Home() {
  const { pizzas, sundaySpecial } = useContext(CartContext);

  const initialCard = [
    {
      title: 'Any Pizza',
      info: 'on our menu',
      price: formatCurrency(14),
      img: './images/Salsiccia.webp',
      altText: 'pizza-image',
    },
  ];
  const [cards, setCards] = useState(initialCard);
  const [currentIndex, setCurrentIndex] = useState(0);

  const getCardsData = (pizzas) => {
    const pizzasSpecials = pizzas.filter(
      (pizza) => pizza.specialDay.length > 0
    );
    pizzasSpecials.sort((a, b) => a.specialDay - b.specialDay);

    const addingCards = pizzasSpecials.map((special) => {
      return {
        title: `${getWeekDayStr(special.specialDay[0])} Special`,
        info: special.title,
        price: formatCurrency(special.specialPrice),
        img: special.src,
        altText: `${special.title}-pizza`,
        specialDay: special.specialDay,
      };
    });

    const sunday = {
      title: 'Sunday Special',
      info: `Buy ${sundaySpecial.minQty} or more for`,
      price: `${formatCurrency(sundaySpecial.pricePerPizza)} each`,
      img: './images/Rucola-Prosciutto.webp',
      altText: `pizza-img`,
      specialDay: 0,
    };

    setCards([...initialCard, ...addingCards, sunday]);
  };

  useEffect(() => {
    if (pizzas.length > 0) {
      getCardsData(pizzas);
    }
  }, [pizzas]);

  return (
    <div className={styles.home}>
      <div className={styles.imgContainer}>
        <Carousel
          cards={cards}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />
      </div>
    </div>
  );
}
