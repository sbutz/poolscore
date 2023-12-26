import {
  BeforeCreateResponse,
} from "firebase-functions/lib/common/providers/identity";
import {db, storage} from "./firebase";
import {onDocumentDeleted} from "firebase-functions/v2/firestore";

/**
 * Create Club and add the id to the user's claims.
 */
export async function createClub(): Promise<BeforeCreateResponse> {
  const clubRef = db.collection("clubs").doc();
  await clubRef.set({name: "My Club"});

  return {
    customClaims: {clubId: clubRef.id},
  };
}

export const deleteClub = onDocumentDeleted(
  "clubs/{clubId}",
  async (event) => {
    // todo:
    const snapshot = event.data;
    if (!snapshot) return;

    const {clubId} = event.params;
    await db.recursiveDelete(db.collection(`clubs/${clubId}/tables`));
    await storage.deleteFiles({prefix: `${clubId}/`});
  },
);
