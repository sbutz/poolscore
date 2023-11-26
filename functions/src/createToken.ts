import {onCall, HttpsError} from "firebase-functions/v2/https";
import {auth, db} from "./firebase";
import {customAlphabet, nanoid} from "nanoid";

const minute = 60*1000;
const tokenAlphabet = "123456789ABCDEFGHIJKLMNPQRSTUVWXYZ";
const tokenLength = 4;
const generator = customAlphabet(tokenAlphabet, tokenLength);

const isValidToken = (token: string) => {
  return token.length == tokenLength &&
         !token.split("").some((e) => !tokenAlphabet.includes(e));
};

export const createToken = onCall({cors: true}, async (request) => {
  const uid = request.auth?.uid;
  if (!uid) {
    throw new HttpsError(
      "unauthenticated",
      "Not authenticated or missing privileges."
    );
  }

  const clubId = request.auth?.token.clubId;
  const isAdmin = request.auth?.token.admin;
  if (!isAdmin || !clubId) {
    throw new HttpsError(
      "permission-denied",
      "Missing privileges."
    );
  }

  const {tableId} = request.data;
  if (!tableId) {
    throw new HttpsError(
      "invalid-argument",
      "Missing required parameter 'tableId'."
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
  const {token} = request.data as {token: string};
  if (!token || !isValidToken(token)) {
    throw new HttpsError(
      "invalid-argument",
      "Missing or malformed parameter 'token'."
    );
  }

  const query = await db.collectionGroup("tables")
    .where("token.value", "==", token)
    .where("token.expires", ">", Date.now())
    .get();

  // Invalidate token
  await query.docs.at(0)?.ref.update({token: {}});

  // Missing unique check during insertion requires to check for duplicates
  if (query.size != 1) {
    throw new HttpsError(
      "not-found",
      "Specified token not found or expired",
    );
  }

  const clubId = query.docs.at(0)?.ref.parent?.parent?.id;
  const jwt = await auth.createCustomToken(nanoid(), {clubId});

  return {jwt};
});
