import {initializeApp} from "firebase-admin/app";
import {getAuth} from "firebase-admin/auth";
import {getFirestore} from "firebase-admin/firestore";
import {getStorage} from "firebase-admin/storage";

const config = process.env.FIREBASE_CONFIG ?
  JSON.parse(process.env.FIREBASE_CONFIG) : undefined;

const app = initializeApp(config);
export const auth = getAuth(app);
export const storage = getStorage(app).bucket();
export const db = getFirestore(app);
db.settings({ignoreUndefinedProperties: true});
