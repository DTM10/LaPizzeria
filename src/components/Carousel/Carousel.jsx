import styles from './Carousel.module.scss';
import React, { useState, useEffect } from 'react';
import CarouselCard from '../CarouselCard/CarouselCard';

export default function Carousel({ cards, currentIndex, setCurrentIndex }) {
  const nextCard = () => {
    const newIndex = currentIndex < cards.length - 1 ? currentIndex + 1 : 0;
    console.log('nextIndex is: ', newIndex);
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    // const interval = setInterval(nextImage, 3000);
    // return () => clearInterval(interval);
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
            className={currentIndex === index ? 'active' : ''}
            onClick={() => setCurrentIndex(index)}
          >
            &#9679;
          </button>
        ))}
      </div>
    </div>
  );
}
