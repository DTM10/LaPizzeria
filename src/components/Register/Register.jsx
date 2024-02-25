import React, { useEffect, useState } from 'react';
import styles from './register.module.css';
import { canadianProvincesTerritoriesInitials } from '../../Helper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { auth, db } from '../../firebaseConfig';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Feedback } from '../Feedback/Feedback';

export function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPhone, setPhone] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('ON');
  const [isRegistered, setIsRegistered] = useState(false);
  const [showFeedbackMsg, setShowFeedback] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (isRegistered) {
      //go to login page after 5 seconds
      setTimeout(() => {
        navigate('/login');
      }, 5000);
    }
  }, [isRegistered]);

  const registerUser = () => {
    console.log('registerUser called');
    createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
      .then((userCredentials) => {
        const user = userCredentials.user;
        sendEmailVerification(auth.currentUser);
        setDoc(doc(db, 'users', user.uid), {
          firstName: firstName,
          lastName: lastName,
          phone: registerPhone,
          address: streetAddress,
          city: city,
          province: province,
        })
          .then((res) => {
            console.log(res);
            setIsRegistered(true);
            setFeedbackMsg(
              'Account created! We have sent you an email to confirm your account. Please verify your email by following the instructions in the email.'
            );
            setShowFeedback(true);
          })
          .catch((err) => {
            console.log(
              'Error saving the user data in DB when registering',
              err
            );
          });
      })
      .catch((e) => {
        const errorCode = e.code;
        const errorMsg = e.message;
        console.log('Error trying to register new user.');
        console.log('Error code: ', errorCode);
        console.log('Error Message: ', errorMsg);
        setFeedbackMsg(`Error trying to register user: ${errorCode}`);
        setShowFeedback(true);
      });
  };

  return (
    <div className={styles.register}>
      {isRegistered && <Feedback feedbackMsg={feedbackMsg} />}
      {!isRegistered && (
        <div className={styles.registerContainer}>
          <h1 className={styles.title}>Register</h1>
          <div className={styles.group}>
            <label className={styles.label}>
              First Name:
              <input
                className={styles.input}
                id="fName"
                type="text"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
            </label>
            <label className={styles.label}>
              Last Name:
              <input
                className={styles.input}
                id="lName"
                type="text"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
            </label>
          </div>
          <div className={styles.group}>
            <label className={styles.label}>
              Street Address:
              <input
                className={styles.input}
                id="address"
                type="text"
                value={streetAddress}
                onChange={(e) => {
                  setStreetAddress(e.target.value);
                }}
              />
            </label>
            <label className={styles.label}>
              City:
              <input
                className={styles.input}
                id="city"
                type="text"
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                }}
              />
            </label>
            <label className={styles.label}>
              Province:
              <select
                value={province}
                className={styles.input}
                id="province"
                onChange={(e) => {
                  setProvince(e.target.value);
                }}
              >
                {canadianProvincesTerritoriesInitials.map((p) => (
                  <option value={p} key={p} id={p}>
                    {p}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className={styles.group}>
            <label className={styles.label}>
              Email:
              <input
                className={styles.input}
                id="email"
                type="email"
                value={registerEmail}
                onChange={(e) => {
                  setRegisterEmail(e.target.value);
                }}
              />
            </label>
            <label className={styles.label}>
              Password:
              <input
                className={styles.input}
                id="password"
                type="password"
                value={registerPassword}
                onChange={(e) => {
                  setRegisterPassword(e.target.value);
                }}
              />
            </label>
            <label className={styles.label}>
              Phone:
              <input
                className={styles.input}
                id="phone"
                type="tel"
                pattern="\(\d{3}\) \d{3}-\d{4}"
                value={registerPhone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              />
            </label>
          </div>
          <div className={styles.btnContainer}>
            <button onClick={registerUser} className={styles.button}>
              REGISTER
              <FontAwesomeIcon
                icon={faArrowRightToBracket}
                className={styles.btnIcon}
              />
            </button>
          </div>
          <div className={styles.btnContainer}>
            <Link to="/login" className={styles.loginLink}>
              Already registered?
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
