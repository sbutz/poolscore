import {doc, DocumentReference, getDoc} from "firebase/firestore";
import {
  initializeTestEnvironment, RulesTestEnvironment,
} from "@firebase/rules-unit-testing";
import {readFileSync} from "fs";

import createUser from "./createUser";

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

it("should add create user and club", async function() {
  await createUser("alice");

  await testEnv.withSecurityRulesDisabled(async (context) => {
    const db = context.firestore();

    const snapshotAlice = await getDoc(doc(db, "users/alice"));
    expect(snapshotAlice.data()?.club).toBeInstanceOf(DocumentReference);

    const snapshotUndefined = await getDoc(doc(db, "users/undefined"));
    expect(snapshotUndefined.data()).toBeUndefined();
  });
});
