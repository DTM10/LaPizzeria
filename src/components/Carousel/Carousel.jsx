import styles from './Carousel.module.scss';
import React, { useState, useEffect } from 'react';
import CarouselCard from '../CarouselCard/CarouselCard';

export default function Carousel({ cards, currentIndex, setCurrentIndex }) {
  const [hasTimeout, setHasTimeout] = useState(null);

  const nextCard = () => {
    if (!hasTimeout) {
      setHasTimeout(true);
      setCurrentIndex(1);
    } else {
      const newIndex = currentIndex < cards.length - 1 ? currentIndex + 1 : 0;
      setCurrentIndex(newIndex);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      nextCard();
    }, 3000);
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
            onClick={() => setCurrentIndex(index)}
          >
            &#9679;
          </button>
        ))}
      </div>
    </div>
  );
}
