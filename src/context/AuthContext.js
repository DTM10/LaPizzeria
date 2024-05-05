import React, { createContext, useCallback, useEffect, useState } from 'react';
import { db, auth } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore';

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [userId, setUserId] = useState('');
  const [userDetails, setUserDetails] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [forDeliverOrders, setForDeliverOrders] = useState([]);
  const [deliveredOrders, setDeliveredOrders] = useState([]);

  console.log('AuthContext');

  useEffect(() => {
    console.log('AuthContext no dependency useEffect');
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        if (user.emailVerified) {
          setUserId(uid);
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
          setUserId('');
        }
      } else {
        setIsLoggedIn(false);
        setUserId('');
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    console.log('AuthContext WITH dependency useEffect');
    if (userId) {
      console.log(
        'AuthContext WITH dependency useEffect - passed condition with userId: ',
        userId
      );

      const docRef = doc(db, 'users', userId);
      const fetchUserData = async () => {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserDetails(docSnap.data());
        } else {
          console.log('No such document!');
        }
      };

      fetchUserData();
      fetchOrders();
    } else {
      setUserDetails({});
      setIsLoggedIn(false);
    }
  }, [userId]);

  const fetchPendingOrders = useCallback(() => {
    const userDocRef = doc(db, 'users', userId);
    const ordersCollectionRef = collection(userDocRef, 'orders');
    const q = query(ordersCollectionRef, where('status', '==', 'pending'));

    getDocs(q).then((querySnapshot) => {
      const tempOrders = [];
      querySnapshot.forEach((doc) => {
        tempOrders.push({ ...doc.data(), orderId: doc.id });
      });
      tempOrders.sort((a, b) => a.timestamp - b.timestamp);
      setPendingOrders(tempOrders);
    });
  }, [userId]);

  const fetchForDeliverOrders = useCallback(() => {
    const userDocRef = doc(db, 'users', userId);
    const ordersCollectionRef = collection(userDocRef, 'orders');
    const q = query(ordersCollectionRef, where('status', '==', 'fordeliver'));
    getDocs(q).then((querySnapshot) => {
      const tempOrders = [];
      querySnapshot.forEach((doc) => {
        tempOrders.push({ ...doc.data(), orderId: doc.id });
      });
      tempOrders.sort((a, b) => a.timestamp - b.timestamp);
      setForDeliverOrders(tempOrders);
    });
  }, [userId]);

  const fetchDeliveredOrders = useCallback(() => {
    const userDocRef = doc(db, 'users', userId);
    const ordersCollectionRef = collection(userDocRef, 'orders');
    const q = query(ordersCollectionRef, where('status', '==', 'delivered'));
    getDocs(q).then((querySnapshot) => {
      const tempOrders = [];
      querySnapshot.forEach((doc) => {
        tempOrders.push({ ...doc.data(), orderId: doc.id });
      });
      tempOrders.sort((a, b) => a.timestamp - b.timestamp);
      setDeliveredOrders(tempOrders);
    });
  }, [userId]);

  const fetchOrders = useCallback(() => {
    if (!userId) return;
    fetchPendingOrders();
    fetchForDeliverOrders();
    fetchDeliveredOrders();
  }, [userId]);

  return (
    <AuthContext.Provider
      value={{
        setUserId,
        userDetails,
        isLoggedIn,
        userId,
        fetchOrders,
        pendingOrders,
        forDeliverOrders,
        deliveredOrders,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
