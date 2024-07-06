import { initializeApp } from 'firebase/app';
import { connectAuthEmulator, getAuth } from 'firebase/auth';

function isDevelopmentEnv() {
  return process.env.NODE_ENV === 'development';
}

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

// eslint-disable-next-line import/prefer-default-export
export { auth };
