import { auth } from "firebase-functions";

import { db } from "./firebase";


// TODO: restrict firebase access for service account
// Service (cloud function) account should only create user, set clubid,
// create club -> nothing more

export default auth.user().onCreate(async (user) => {
  // TODO: run both in transaction?
  // TODO: as beforeUserCreate to abort signUP?

  const batch = db.batch();

  const clubRef = db.collection("clubs").doc();
  // TODO: add firestore rules for club
  batch.set(clubRef, {});

  const userRef = db.doc(`users/${user.uid}`);
  // TODO: define datatype reference in rules
  batch.set(userRef, { club: clubRef });

  await batch.commit();
});
