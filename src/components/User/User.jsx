import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import styles from './User.module.scss';
import {
  canadianProvincesTerritoriesInitials,
  checkEmptyInput,
} from '../../Helper';
import {
  faArrowRightToBracket,
  faArrowsRotate,
} from '@fortawesome/free-solid-svg-icons';
import { signOut } from 'firebase/auth';
import { auth, db } from '../../firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { Feedback } from '../Feedback/Feedback';
import { GeneralButton } from '../GeneralButton/GeneralButton';

export function User() {
  const { userDetails, setUserId, userId } = useContext(AuthContext);
  const [address, setAddress] = useState(userDetails.address);
  const [city, setCity] = useState(userDetails.city);
  const [province, setProvince] = useState(userDetails.province);
  const [phone, setPhone] = useState(userDetails.phone);
  const [showFeedbackMsg, setShowFeedback] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState('');

  useEffect(() => {
    if (feedbackMsg !== '') {
      setShowFeedback(true);
      setTimeout(() => {
        setFeedbackMsg('');
        setShowFeedback(false);
      }, 5000);
    }
  }, [feedbackMsg]);

  const updateUser = () => {
    const msg = 'All fields must be filled with the respective data.';
    if (
      !checkEmptyInput(address, setFeedbackMsg, msg) ||
      !checkEmptyInput(city, setFeedbackMsg, msg) ||
      !checkEmptyInput(phone, setFeedbackMsg, msg)
    ) {
      return;
    } else {
      const userRef = doc(db, 'users', userId);
      setDoc(
        userRef,
        { address: address, city: city, phone: phone, province: province },
        { merge: true }
      )
        .then(() => {
          setFeedbackMsg('User has been successfully updated.');
        })
        .catch((e) => {
          setFeedbackMsg(`Error trying to update the user: ${e}`);
        });
    }
  };

  const logout = () => {
    console.log('logout called');
    signOut(auth)
      .then(() => {
        setUserId('');
      })
      .catch((e) => {
        setFeedbackMsg(`Error trying to log the user out: ${e}`);
      });
  };

  return (
    <div className={styles.user}>
      <div className={styles.imgContainer}>
        <img src="./images/Marguerita.webp" alt={'pizza-margherita'} />
      </div>
      <div className={styles.userContainer}>
        <h1>Welcome, {userDetails.firstName}</h1>
        <div className={styles.inputContainer}>
          <label>
            Street Address:
            <input
              id="address"
              type="text"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              onBlur={() => {
                checkEmptyInput(address, setFeedbackMsg);
              }}
            />
          </label>
          <label>
            City:
            <input
              id="city"
              type="text"
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
              }}
              onBlur={() => {
                checkEmptyInput(city, setFeedbackMsg);
              }}
            />
          </label>
          <label className={styles.selectLabel}>
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
          <label className={styles.label}>
            Phone:
            <input
              className={styles.input}
              id="phone"
              type="tel"
              pattern="\(\d{3}\) \d{3}-\d{4}"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
              onBlur={() => {
                checkEmptyInput(city, setFeedbackMsg);
              }}
            />
          </label>
        </div>
        {showFeedbackMsg && (
          <div className={styles.feedbackContainer}>
            <Feedback feedbackMsg={feedbackMsg} />
          </div>
        )}
        <div className={styles.btnContainer}>
          <GeneralButton
            action={updateUser}
            btnText="UPDATE"
            icon={faArrowsRotate}
          />
          <GeneralButton
            action={logout}
            btnText="LOGOUT"
            icon={faArrowRightToBracket}
          />
        </div>
      </div>
    </div>
  );
}
