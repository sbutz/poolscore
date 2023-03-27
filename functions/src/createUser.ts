import { db } from "./firebase";

/**
 * Create Club and assign it to user with id `userId`.
 * @param {string} userId - The id of the new user.
 */
export default async function createClub(userId: string): Promise<void> {
  const batch = db.batch();

  const clubRef = db.collection("clubs").doc();
  batch.set(clubRef, {});

  const userRef = db.doc(`users/${userId}`);
  batch.set(userRef, { club: clubRef });

  await batch.commit();
}
