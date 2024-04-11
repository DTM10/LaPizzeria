import styles from './PageNotFound.module.scss';

export default function PageNotFound() {
  return (
    <div className={styles.pageNotFound}>
      <div className={styles.pageNotFoundContainer}>
        <p>Ooops, this page doesn't exist.</p>
      </div>
    </div>
  );
}
