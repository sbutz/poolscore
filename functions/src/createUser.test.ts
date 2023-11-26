import {doc, getDoc} from "firebase/firestore";
import {
  initializeTestEnvironment, RulesTestEnvironment,
} from "@firebase/rules-unit-testing";
import {readFileSync} from "fs";

/*
 * Blocking Auth Triggers are not called by emulators.
 * Therefore we test the executed function directly.
 */
import createClub from "./createUser";

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
  const {customClaims} = await createClub();
  const {clubId} = customClaims as { clubId: string };

  await testEnv.withSecurityRulesDisabled(async (context) => {
    const db = context.firestore();

    const snapshotClub = await getDoc(doc(db, `clubs/${clubId}`));
    expect(snapshotClub.exists()).toBeTruthy();

    const snapshotUndefined = await getDoc(doc(db, "clubs/undefined"));
    expect(snapshotUndefined.exists()).toBeFalsy();
  });
});
