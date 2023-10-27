import {initializeApp} from "firebase/app";
import {
  getAuth, connectAuthEmulator, signOut as authSignOut,
  signInWithEmailAndPassword, signInWithCustomToken,
} from "firebase/auth";
import {
  getFunctions, connectFunctionsEmulator, httpsCallable,
} from "firebase/functions";
import {FirebaseError} from "firebase-admin";
import {auth as adminAuth, db as adminDb} from "./firebase";
import createUserAndClub from "./createUser";

interface Token {
  token: string,
  expires: Date,
}

interface JWT {
  jwt: string,
}

const firebaseConfig = {
  projectId: process.env.GCLOUD_PROJECT,
  apiKey: "test-key",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
connectAuthEmulator(auth, "http://localhost:9099", {disableWarnings: true});
const functions = getFunctions(app);
connectFunctionsEmulator(functions, "localhost", 5001);
const createToken = httpsCallable(functions, "table-createtoken");
const createJWT = httpsCallable(functions, "table-createjwt");

const defaultUid = "alice";
const defaultEmail = "alice@bc73.de";
const defaultPassword = "123456";
const defaultTable = "Tisch 1";

const createUser = async (
  email = defaultEmail, password = defaultPassword, uid = defaultUid
) => {
  const user = await adminAuth.createUser({email, password, uid});
  return {uid: user.uid, email, password};
};

const getClubId = async (uid = defaultUid) => {
  const userData = await adminDb.doc(`users/${uid}`).get();
  return userData.get("club").id;
};

const createAdminUser = async (
  email = defaultEmail, password = defaultPassword, uid = defaultUid
) => {
  const user = await createUser(email, password, uid);
  await createUserAndClub(user.uid);
  const clubId = await getClubId(uid);
  return {...user, clubId};
};

const signIn = async (email = defaultEmail, password = defaultPassword) => {
  await signInWithEmailAndPassword(auth, email, password);
};

const signOut = async () => {
  await authSignOut(auth);
};

const createTable = async (tableId = defaultTable, clubId = undefined) => {
  clubId = clubId ? clubId : await getClubId(defaultUid);
  await adminDb.doc(`clubs/${clubId}/tables/${tableId}`).create({});
};

const createTableToken = async (
  uid = defaultUid,
  email = defaultEmail,
  password = defaultPassword,
  tableId = defaultTable
) => {
  const {clubId} = await createAdminUser(email, password, uid);
  await createTable(tableId, clubId);
  await signIn(email, password);
  const {data} = await createToken({clubId, tableId});
  await signOut();
  return data as Token;
};

const expireTableToken = async (token: string) => {
  const query = await adminDb.collectionGroup("tables")
    .where("token.value", "==", token).get();
  expect(query.size).toBe(1);
  await query.docs[0].ref.update({"token.expires": Date.now()});
};

const deleteUsers = async () => {
  const users = await adminAuth.listUsers();
  const userIds = users.users.flatMap((u) => u.uid);
  adminAuth.deleteUsers(userIds);
  userIds.forEach(async (uid) => await adminDb.doc(`users/${uid}`).delete());
};

const deleteClubs = async () => {
  await adminDb.recursiveDelete(adminDb.collection("clubs"));
};

afterEach(async () => {
  await signOut();
  await deleteUsers();
  await deleteClubs();
});

it("should throw error if not authenticated", async function() {
  try {
    await createToken({clubId: "123", tableId: "123"});
  } catch (e) {
    const error = e as FirebaseError;
    expect(error.code).toBe("functions/unauthenticated");
  }
});

it("should throw error authenticated as non admin", async function() {
  await createUser();
  await signIn();

  try {
    await createToken({clubId: "123", tableId: "123"});
  } catch (e) {
    const error = e as FirebaseError;
    expect(error.code).toBe("functions/permission-denied");
  }
});

it("should throw error if required parameters are missing", async function() {
  await createUser();
  await signIn();

  const invalidArgs = [{tableId: "123"}, {clubId: "123"}];
  invalidArgs.forEach(async (arg) => {
    try {
      await createToken(arg);
    } catch (e) {
      const error = e as FirebaseError;
      expect(error.code).toBe("functions/invalid-argument");
    }
  });
});

it("should throw error if wrong club id provided", async function() {
  await createAdminUser();
  await signIn();

  try {
    await createToken({clubId: "123", tableId: "123"});
  } catch (e) {
    const error = e as FirebaseError;
    expect(error.code).toBe("functions/permission-denied");
  }
});

it("should throw error if wrong table id provided", async function() {
  const {clubId} = await createAdminUser();
  await signIn();

  try {
    await createToken({clubId, tableId: "123"});
  } catch (e) {
    const error = e as FirebaseError;
    expect(error.code).toBe("functions/not-found");
  }
});

it("should create token", async function() {
  const {token, expires} = await createTableToken();
  expect(token).toHaveLength(4);
  expect(expires).toBeGreaterThan(Date.now());
});

it("should not issue jwt with expired token", async function() {
  const {token} = await createTableToken();
  await(expireTableToken(token));

  try {
    await createJWT({token});
  } catch (e) {
    const error = e as FirebaseError;
    expect(error.code).toBe("functions/not-found");
  }
});

it("should not issue two jwt with one token", async function() {
  const {token} = await createTableToken();

  await createJWT({token});
  try {
    await createJWT({token});
  } catch (e) {
    const error = e as FirebaseError;
    expect(error.code).toBe("functions/not-found");
  }
});

it("fail to login with forged jwt", async function() {
  try {
    await signInWithCustomToken(auth, "123");
  } catch (e) {
    const error = e as FirebaseError;
    expect(error.code).toBe("auth/invalid-custom-token");
  }
});

it("should issue jwt usable for multiple logins", async function() {
  const {token} = await createTableToken();
  const {data} = await createJWT({token});
  const {jwt} = data as JWT;

  await signInWithCustomToken(auth, jwt);
  await signOut();
  await signInWithCustomToken(auth, jwt);
});
