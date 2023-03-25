import * as firebaseTest from "firebase-functions-test";
import { UserInfo, UserRecord } from "firebase-functions/v1/auth";
import { doc, DocumentReference, getDoc } from "firebase/firestore";
import {
  initializeTestEnvironment, RulesTestEnvironment,
} from "@firebase/rules-unit-testing";
import { readFileSync } from "fs";

const test = firebaseTest();
import createUser from "./createUser";
const createUserWrapped = test.wrap(createUser);

let testEnv: RulesTestEnvironment;
beforeAll(async () => {
  testEnv = await initializeTestEnvironment({
    firestore: {
      rules: readFileSync("../firestore/firestore.rules", "utf8"),
    },
  });
});

afterAll(async () => {
  await testEnv.cleanup();
});

it("should add create user and club", async function () {
  await createUserWrapped(fakeUser("alice"));

  await testEnv.withSecurityRulesDisabled(async (context) => {
    const db = context.firestore();

    const snapshotAlice = await getDoc(doc(db, "users/alice"));
    expect(snapshotAlice.data()?.club).toBeInstanceOf(DocumentReference);

    const snapshotUndefined = await getDoc(doc(db, "users/undefined"));
    expect(snapshotUndefined.data()).toBeUndefined();
  });
});

function fakeUser(uid: string): UserRecord {
  return {
    uid,
    emailVerified: true,
    disabled: false,
    metadata: {
      creationTime: Date.now().toString(),
      lastSignInTime: Date.now().toString(),
      toJSON: () => ({}),
    },
    providerData: [] as UserInfo[],
    toJSON: () => ({}),
  };
}
