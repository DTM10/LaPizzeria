import styles from './feedback.module.css';

export function Feedback({ feedbackMsg }) {
  return (
    <div className={styles.feedback}>
      <p className={styles.feedbackMsg}>{feedbackMsg}</p>
    </div>
  );
}
