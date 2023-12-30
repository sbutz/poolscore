import { initializeApp } from 'firebase/app';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { initializeFirestore, connectFirestoreEmulator, enableMultiTabIndexedDbPersistence } from 'firebase/firestore';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';
import { connectStorageEmulator, getStorage } from 'firebase/storage';
import { isDevelopmentEnv, isTestEnv } from '../util/environment';

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
if (isDevelopmentEnv()) { connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true }); }

const db = initializeFirestore(app, { ignoreUndefinedProperties: true });
if (isDevelopmentEnv()) { connectFirestoreEmulator(db, 'localhost', 8080); }
if (!isTestEnv()) { enableMultiTabIndexedDbPersistence(db); }

const functions = getFunctions(app);
if (isDevelopmentEnv()) { connectFunctionsEmulator(functions, 'localhost', 5001); }

const storage = getStorage(app);
if (isDevelopmentEnv()) { connectStorageEmulator(storage, 'localhost', 9199); }

export {
  auth, db, functions, storage,
};
