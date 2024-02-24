import React, { useContext, useState } from 'react';
import styles from './login.module.css';
import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { auth } from '../../firebaseConfig';
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { User } from '../User/User';
import { GeneralButton } from '../GeneralButton/GeneralButton';

export function Login() {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const { setUserId, isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const login = () => {
    console.log('login called');
    signInWithEmailAndPassword(auth, loginEmail, loginPassword)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log(user.auth.currentUser);
        console.log(user.auth.currentUser.emailVerified);
        if (user.auth.currentUser.emailVerified) {
          setUserId(user.uid);
          navigate('/menu');
        } else {
          // SHOW A FEEDBACK MESSAGE TELLING THE USER TO VERIFY ITS EMAIL.
        }
      })
      .catch((e) => {
        const errorCode = e.code;
        const errorMsg = e.message;
        console.log('Error trying to login.');
        console.log('Error code: ', errorCode);
        console.log('Error message: ', errorMsg);
      });
  };

  const resetPassword = () => {
    sendPasswordResetEmail(auth, loginEmail)
      .then(() => {
        // SHOW A FEEDBACK MESSAGE TO THE USER SAYING THAT THE EMAIL WAS SENT IF THERE IS AN ACCOUNT WITH THIS EMAIL.
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('ERROR trying to send a password reset email.');
        console.log('Error code: ', errorCode);
        console.log('Error message: ', errorMessage);
        // ..
      });
  };

  return (
    <div className={styles.login}>
      {!isLoggedIn && (
        <div className={styles.loginContainer}>
          <h1 className={styles.title}>Login</h1>
          <div className={styles.group}>
            <label className={styles.label}>
              Email:
              <input
                className={styles.input}
                id="email"
                type="email"
                value={loginEmail}
                onChange={(e) => {
                  setLoginEmail(e.target.value);
                }}
              />
            </label>
            <label className={styles.label}>
              Password:
              <input
                className={styles.input}
                id="password"
                type="password"
                value={loginPassword}
                onChange={(e) => {
                  setLoginPassword(e.target.value);
                }}
              />
            </label>
          </div>
          <div className={styles.btnContainer}>
            <GeneralButton
              action={login}
              btnText="LOGIN"
              icon={faArrowRightToBracket}
            />
          </div>
          <div className={styles.linksContainer}>
            <Link to="/register" className={styles.link}>
              Not registered?
            </Link>

            <button className={styles.link} onClick={resetPassword}>
              Forgot password?
            </button>
          </div>
        </div>
      )}
      {isLoggedIn && <User />}
    </div>
  );
}
