import styles from './CarouselCard.module.scss';

function CarouselCard() {
  return (
    <div className={styles.carouselCard}>
      <div className={styles.carouselCardContainer}>
        <div className={styles.imgContainer}>
          <img
            src="./images/Quattro-Formaggi.webp"
            alt="pizza-Quattro-Formaggi"
          />
        </div>
        <div className={styles.contentContainer}>
          <h2>Monday Special</h2>
          <div className={styles.dataContainer}>
            <p>Quatro Formaggi</p>
            <p className={styles.price}>$11.00</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarouselCard;
