import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import styles from './User.module.scss';
import { canadianProvincesTerritoriesInitials } from '../../Helper';
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

  const updateUser = () => {
    const userRef = doc(db, 'users', userId);
    setDoc(
      userRef,
      { address: address, city: city, phone: phone, province: province },
      { merge: true }
    )
      .then(() => {
        setFeedbackMsg('User has been successfully updated.');
        setShowFeedback(true);
        setTimeout(() => {
          setFeedbackMsg('');
          setShowFeedback(false);
        }, 5000);
      })
      .catch((e) => {
        setFeedbackMsg(`Error trying to update the user: ${e}`);
        setShowFeedback(true);
        setTimeout(() => {
          setFeedbackMsg('');
          setShowFeedback(false);
        }, 5000);
      });
  };

  const logout = () => {
    console.log('logout called');
    signOut(auth)
      .then(() => {
        setUserId('');
      })
      .catch((e) => {
        setFeedbackMsg(`Error trying to log the user out: ${e}`);
        setShowFeedback(true);
        setTimeout(() => {
          setFeedbackMsg('');
          setShowFeedback(false);
        }, 5000);
      });
  };

  return (
    <div className={styles.user}>
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
