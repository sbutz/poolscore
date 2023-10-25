import { initializeApp } from 'firebase/app';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';
import isDevelopment from '../util/environment';

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
if (isDevelopment()) { connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true }); }

const db = getFirestore(app);
if (isDevelopment()) { connectFirestoreEmulator(db, 'localhost', 8080); }

const functions = getFunctions(app);
if (isDevelopment()) { connectFunctionsEmulator(functions, 'localhost', 5001); }

export { auth, db };
