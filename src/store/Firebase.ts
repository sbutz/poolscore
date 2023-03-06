import { initializeApp } from 'firebase/app';
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
const db = getFirestore(app);
connectFirestoreEmulator(db, 'localhost', 8080);

export default db;
