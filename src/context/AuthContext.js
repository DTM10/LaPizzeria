import React, {createContext, useEffect, useState} from 'react';
import { db } from '../firebaseConfig';
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";

const AuthContext = createContext();

function AuthProvider({children}) {
    const [userId, setUserId] = useState('');
    const [userDetails, setUserDetails] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [pendingOrders, setPendingOrders] = useState([])
    const [forDeliverOrders, setForDeliverOrders] = useState([])
    const [deliveredOrders, setDeliveredOrders] = useState([])

    useEffect(()=>{
        if(userId !== '') {
            setIsLoggedIn(true);
            fetchOrders()
            const docRef = doc(db, 'users', userId);
            getDoc(docRef)
            .then((res)=>{
                const docSnap = res;
                if (docSnap.exists()) {
                    console.log("Document data:", docSnap.data());
                    setUserDetails(docSnap.data());
                } else {
                    console.log("No such document!");
                }
            }  
            ).catch((e)=> {
                console.log('Error trying to retrieve users details');
            })
        } else {
            setIsLoggedIn(false);
            setUserDetails({});
            setPendingOrders([]);
        }
    },[userId])

    const fetchPendingOrders = () => {
        const userDocRef = doc(db, 'users', userId);
        const ordersCollectionRef = collection(userDocRef, 'orders');
        const q = query(ordersCollectionRef, where('status', '==', 'pending'));
        getDocs(q)
        .then((querySnapshot)=>{
            const tempOrders = [];
            querySnapshot.forEach((doc)=>{
                console.log(doc.id, '=>', doc.data());
                tempOrders.push({...doc.data(), orderId: doc.id});
            })
            console.log('tempOrders: ', tempOrders);
            setPendingOrders(tempOrders);
        })
    };

    const fetchForDeliverOrders = () => {
        const userDocRef = doc(db, 'users', userId);
        const ordersCollectionRef = collection(userDocRef, 'orders');
        const q = query(ordersCollectionRef, where('status', '==', 'fordeliver'));
        getDocs(q)
        .then((querySnapshot)=>{
            const tempOrders = [];
            querySnapshot.forEach((doc)=>{
                console.log(doc.id, '=>', doc.data());
                tempOrders.push({...doc.data(), orderId: doc.id});
            })
            console.log('tempOrders: ', tempOrders);
            setForDeliverOrders(tempOrders);
        })
    }

    const fetchDeliveredOrders = () => {
        const userDocRef = doc(db, 'users', userId);
        const ordersCollectionRef = collection(userDocRef, 'orders');
        const q = query(ordersCollectionRef, where('status', '==', 'delivered'));
        getDocs(q)
        .then((querySnapshot)=>{
            const tempOrders = [];
            querySnapshot.forEach((doc)=>{
                console.log(doc.id, '=>', doc.data());
                tempOrders.push({...doc.data(), orderId: doc.id});
            })
            console.log('tempOrders: ', tempOrders);
            setDeliveredOrders(tempOrders);
        })
    }

    const fetchOrders = () =>{
        fetchPendingOrders();
        fetchForDeliverOrders();
        fetchDeliveredOrders();
    }

    const fetchOrderByNumber = (order) => {

    } 

    return (<AuthContext.Provider value={{ setUserId, userDetails, isLoggedIn, userId , fetchOrders, fetchOrderByNumber, pendingOrders, forDeliverOrders, deliveredOrders}}>{children}</AuthContext.Provider>)
}

export {AuthContext, AuthProvider}