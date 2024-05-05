import styles from './Carousel.module.scss';
import React, { useState, useMemo } from 'react';
import CarouselCard from '../CarouselCard/CarouselCard';

export default function Carousel({ cards, currentIndex, setCurrentIndex }) {
  const [hasTimeout, setHasTimeout] = useState(null);
  const [timeoutId, setTimeoutId] = useState();

  const nextCard = () => {
    if (!hasTimeout) {
      setHasTimeout(true);
      setCurrentIndex(1);
    } else {
      const newIndex = currentIndex < cards.length - 1 ? currentIndex + 1 : 0;
      setCurrentIndex(newIndex);
    }
  };

  const createTimeout = useMemo(() => {
    const id = setTimeout(() => {
      nextCard();
      return () => {
        clearTimeout(timeoutId);
      };
    }, 3000);
    setTimeoutId(id);
  }, [currentIndex]);

  return (
    <div className={styles.carousel}>
      <CarouselCard
        title={cards[currentIndex].title}
        info={cards[currentIndex].info}
        price={cards[currentIndex].price}
        img={cards[currentIndex].img}
        altText={cards[currentIndex].altText}
      />
      <div className={styles.navController}>
        {cards.map((_, index) => (
          <button
            key={index}
            className={currentIndex === index ? styles.active : ''}
            onClick={() => {
              clearTimeout(timeoutId);
              setCurrentIndex(index);
            }}
          >
            &#9679;
          </button>
        ))}
      </div>
    </div>
  );
}
