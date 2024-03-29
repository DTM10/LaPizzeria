import styles from './CarouselCard.module.scss';

function CarouselCard({ title, info, price, img, altText }) {
  return (
    <div className={styles.carouselCard}>
      <div className={styles.carouselCardContainer}>
        <div className={styles.imgContainer}>
          <img src={img} alt={altText} />
        </div>
        <div className={styles.contentContainer}>
          <h2>{title}</h2>
          <div className={styles.dataContainer}>
            <p>{info}</p>
            <p className={styles.price}>{price}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarouselCard;
