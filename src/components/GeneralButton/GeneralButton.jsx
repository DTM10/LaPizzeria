import styles from './generalButton.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function GeneralButton({ action, btnText, icon }) {
  return (
    <button onClick={action} className={styles.button}>
      {btnText}
      <FontAwesomeIcon icon={icon} className={styles.btnIcon} />
    </button>
  );
}
