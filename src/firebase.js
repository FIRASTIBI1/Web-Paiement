// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAw0M0V2lU7tEY4SPNvaqMIGt7ccDcEQhA",
  authDomain: "kaibi-ce64f.firebaseapp.com",
  projectId: "kaibi-ce64f",
  storageBucket: "kaibi-ce64f.appspot.com",  // Note: Corrected storageBucket URL
  messagingSenderId: "527531009779",
  appId: "1:527531009779:web:3685641db3bdb9df2eb986"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
