import styles from './qtyToggle.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
export default function QtyToggle({
  handleDecrease,
  handleIncrease,
  setQty,
  qty,
  param,
  canDescrease,
  canEditValue,
}) {
  return (
    <div className={styles.qty}>
      <button
        disabled={!canDescrease}
        className={canDescrease ? styles.btn : styles.disabled}
        onClick={() => {
          if (param) {
            handleDecrease(param);
          } else {
            handleDecrease();
          }
        }}
      >
        <FontAwesomeIcon icon={faMinus} size="xs" />
        {/* - */}
      </button>
      <input
        className={styles.qtyAmount}
        value={qty}
        onChange={(e) => {
          setQty(e.target.value);
        }}
        disabled={!canEditValue}
      />
      <button
        className={styles.btn}
        onClick={() => {
          if (param) {
            handleIncrease(param);
          } else {
            handleIncrease();
          }
        }}
      >
        <FontAwesomeIcon icon={faPlus} size="xs" />
        {/* + */}
      </button>
    </div>
  );
}
