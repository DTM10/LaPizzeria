import { GeneralButton } from '../GeneralButton/GeneralButton';
import { useNavigate } from 'react-router-dom';
import styles from './NotLoggedIn.module.scss';
import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';

export default function NotLoggedIn() {
  const navigate = useNavigate();
  return (
    <div className={styles.notLoggedIn}>
      <div className={styles.notLoggedInContainer}>
        <p>Ooops, you're not logged in.</p>
        <GeneralButton
          action={() => {
            navigate('/login');
          }}
          btnText={'Login'}
          icon={faArrowRightToBracket}
        />
      </div>
    </div>
  );
}
