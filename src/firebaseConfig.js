// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
// const analytics = getAnalytics(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { db };
