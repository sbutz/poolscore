import {
  onDocumentCreated,
  onDocumentDeleted,
} from "firebase-functions/v2/firestore";
import {db} from "./firebase";
import {DocumentReference} from "firebase-admin/firestore";

export const createGame = onDocumentCreated(
  "clubs/{clubId}/tables/{tableId}",
  async (event) => {
    const snapshot = event.data;
    const data = snapshot?.data();
    if (!snapshot || !data || data.game) {
      return;
    }

    const tableRef = snapshot.ref;
    const clubRef = db.doc(`clubs/${event.params.clubId}`);
    const gameRef = db.collection("games").doc();

    const batch = db.batch();
    batch.set(gameRef, {
      table: tableRef,
      club: clubRef,
      type: "8_BALL",
      state: {},
    });
    batch.set(snapshot.ref, {game: gameRef}, {merge: true});
    await batch.commit();
  },
);

export const deleteGame = onDocumentDeleted(
  "clubs/{clubId}/tables/{tableId}",
  async (event) => {
    const snapshot = event.data;
    const data = snapshot?.data();
    if (!snapshot || !data || !data.game) {
      return;
    }

    const gameRef = data.game as DocumentReference;
    await gameRef.delete();
  },
);
