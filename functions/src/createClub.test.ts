import {createClub} from "./createClub";
import {db, storage} from "./firebase";

const clubId = "bc73";
const clubPath = `clubs/${clubId}`;
const tableId = "Table 1";
const tablePath = `${clubPath}/tables/${tableId}`;

const defaultSleepTime = 2000;
const sleep = (ms: number = defaultSleepTime) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

afterEach(async () => {
  await db.recursiveDelete(db.collection(`clubs/${clubId}/tables`));
  await db.recursiveDelete(db.collection("clubs"));
  await storage.deleteFiles({prefix: `clubs/${clubId}`});
});

/*
 * Blocking Auth Triggers are not called by emulators.
 * Therefore we test the executed function directly.
 */
it("should add create club", async () => {
  const {customClaims} = await createClub();
  const {clubId} = customClaims as { clubId: string };

  expect((await db.doc(`clubs/${clubId}`).get()).exists).toBeTruthy();
  expect((await db.doc("clubs/undefined").get()).exists).toBeFalsy();
});

it("should delete all tables", async () => {
  await db.doc(clubPath).set({name: "foo"});
  await db.doc(tablePath).set({foo: "bar"});

  await db.doc(clubPath).delete();
  await sleep();
  expect((await db.doc(tablePath).get()).exists).toBeFalsy();
});

it("should delete all of the clubs files", async () => {
  await db.doc(clubPath).set({name: "foo"});
  const destFile = `${clubId}/logo.png`;
  await storage.file(destFile).save("123");

  await db.doc(clubPath).delete();
  await sleep();
  expect((await storage.file(destFile).exists())[0]).toBeFalsy();
});
