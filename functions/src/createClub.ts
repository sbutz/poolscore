import {
  BeforeCreateResponse,
} from "firebase-functions/lib/common/providers/identity";
import {db} from "./firebase";

/**
 * Create Club and add the id to the user's claims.
 */
export default async function createClub(): Promise<BeforeCreateResponse> {
  const clubRef = db.collection("clubs").doc();
  await clubRef.set({name: "My Club"});

  return {
    customClaims: {clubId: clubRef.id},
  };
}

// TODO: on club delete
// delete log from storage
// delete tables collection => should delete games
