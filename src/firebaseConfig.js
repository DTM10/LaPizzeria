import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
	apiKey: 'AIzaSyBpfMHIWopsodUxwP1zGKjPZyVEcxt8ffs',
	authDomain: 'lapizzeria-b7ae4.firebaseapp.com',
	projectId: 'lapizzeria-b7ae4',
	storageBucket: 'lapizzeria-b7ae4.appspot.com',
	messagingSenderId: '687711673307',
	appId: '1:687711673307:web:68fe8fd64c644820a1e5fe',
	measurementId: 'G-X92R9RCZYX'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { db, auth };
