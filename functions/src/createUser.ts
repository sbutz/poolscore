import { auth } from "firebase-functions";

import { db } from "./firebase";

export default auth.user().onCreate(async (user) => {
  // TODO: as beforeUserCreate to abort signUP?

  const batch = db.batch();

  const clubRef = db.collection("clubs").doc();
  batch.set(clubRef, {});

  const userRef = db.doc(`users/${user.uid}`);
  batch.set(userRef, { club: clubRef });

  await batch.commit();
});
