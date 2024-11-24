// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';  // Import collection and addDoc
import { getAnalytics } from 'firebase/analytics';  // Import Firebase Analytics

// Votre configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAw0M0V2lU7tEY4SPNvaqMIGt7ccDcEQhA",
  authDomain: "kaibi-ce64f.firebaseapp.com",
  projectId: "kaibi-ce64f",
  storageBucket: "kaibi-ce64f.appspot.com",
  messagingSenderId: "527531009779",
  appId: "1:527531009779:web:3685641db3bdb9df2eb986"
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);

// Initialiser les services
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);  // Initialiser Analytics

// Exporter les services et Firestore methods
export { auth, db, analytics, collection, addDoc };
