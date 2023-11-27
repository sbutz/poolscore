import {initializeApp, applicationDefault} from "firebase-admin/app";
import {getAuth} from "firebase-admin/auth";
import {getFirestore} from "firebase-admin/firestore";

const isDevelopment = () => {
  return Boolean(process.env.FUNCTIONS_EMULATOR);
};

const config = isDevelopment() ? {
  credential: applicationDefault(),
  projectId: process.env.GCLOUD_PROJECT,
} : undefined;

const app = initializeApp(config);
export const auth = getAuth(app);
export const db = getFirestore(app);
