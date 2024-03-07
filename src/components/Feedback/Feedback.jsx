import styles from './Feedback.module.scss';

export function Feedback({ feedbackMsg }) {
  return (
    <div className={styles.feedback}>
      <p className={styles.feedbackMsg}>{feedbackMsg}</p>
    </div>
  );
}
