import { initializeApp } from 'firebase/app';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyD4jUVmL7dUKi7l6fQqmxHqzVZR_sidLG8',
  authDomain: 'poolscore-1973.firebaseapp.com',
  projectId: 'poolscore-1973',
  storageBucket: 'poolscore-1973.appspot.com',
  messagingSenderId: '756573615917',
  appId: '1:756573615917:web:a5e9a2dd1e71d170f285a4',
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
connectAuthEmulator(auth, 'http://localhost:9099');

const db = getFirestore(app);
connectFirestoreEmulator(db, 'localhost', 8080);

export { auth, db };
