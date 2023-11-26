/*
 * Blocking Auth Triggers are not called by emulators.
 * Therefore we test the executed function directly.
 */
import createClub from "./createUser";
import {db} from "./firebase";

it("should add create club", async function() {
  const {customClaims} = await createClub();
  const {clubId} = customClaims as { clubId: string };

  expect((await db.doc(`clubs/${clubId}`).get()).exists).toBeTruthy();
  expect((await db.doc("clubs/undefined").get()).exists).toBeFalsy();
});
