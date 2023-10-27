import {onCall, HttpsError} from "firebase-functions/v2/https";
import {auth, db} from "./firebase";
import {DocumentReference} from "firebase-admin/firestore";
import {customAlphabet, nanoid} from "nanoid";

const generator = customAlphabet("123456789ABCDEFGHIJKLMNPQRSTUVWXYZ", 4);
const minute = 60*1000;

export const createToken = onCall({cors: true}, async (request) => {
  const uid = request.auth?.uid;
  if (!uid) {
    throw new HttpsError(
      "unauthenticated",
      "The function must be called while authenticated."
    );
  }
  const {clubId, tableId} = request.data;
  if (!clubId || !tableId) {
    throw new HttpsError(
      "invalid-argument",
      "Missing required parameters 'clubId' and 'tableId'."
    );
  }

  const userData = await db.doc(`users/${uid}`).get();
  if (!userData.exists) {
    throw new HttpsError(
      "not-found",
      "No user found for specified user id."
    );
  }
  const clubRef : DocumentReference = userData.get("club");
  if (clubRef.id != clubId) {
    throw new HttpsError(
      "permission-denied",
      "User not allowed to manage specified club."
    );
  }

  const tableRef = db.doc(`clubs/${clubId}/tables/${tableId}`);
  const tableData = await tableRef.get();
  if (!tableData.exists) {
    throw new HttpsError(
      "not-found",
      "No table found for specified table id."
    );
  }

  const token = generator();
  const expires = Date.now() + 30*minute;

  await tableRef.update({
    "token.value": token,
    "token.expires": expires,
  });

  return {token, expires};
});

export const createJWT = onCall({cors: true}, async (request) => {
  const {token} = request.data;
  if (!token) {
    throw new HttpsError(
      "invalid-argument",
      "Missing required parameter 'token'."
    );
  }

  const query = await db.collectionGroup("tables")
    .where("token.value", "==", token)
    .where("token.expires", ">", Date.now())
    .get();

  // Missing unique check during insertion requires to check for duplicates
  if (query.size != 1) {
    throw new HttpsError(
      "not-found",
      "Specified token not found or expired",
    );
  }

  const jwt = await auth.createCustomToken(nanoid());
  return {jwt};
});
