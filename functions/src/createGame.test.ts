import {DocumentReference} from "firebase-admin/firestore";
import {db as adminDb} from "./firebase";

const sleep = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

const clubId = "bc73";
const clubPath = `clubs/${clubId}`;
const tableId = "Tisch 1";
const tablePath = `${clubPath}/tables/${tableId}`;

const createTable = async () => {
  const tableRef = adminDb.doc(tablePath);
  await tableRef.create({});
  return tableRef;
};

const getGameRef = async (tableRef: DocumentReference) => {
  const tableData = (await tableRef.get()).data();
  return tableData?.game as DocumentReference;
};

beforeEach(async () => {
  await adminDb.doc(clubPath).create({});
});

afterEach(async () => {
  await adminDb.recursiveDelete(adminDb.collection("games"));
  await adminDb.recursiveDelete(adminDb.collection(`clubs/${clubId}/tables`));
  await adminDb.recursiveDelete(adminDb.collection("clubs"));
});

it("should create a game if a table is added", async function() {
  const tableRef = await createTable();
  await sleep(1000); // wait for cloud trigger
  const gameRef = await getGameRef(tableRef);
  expect(gameRef.path).toBeDefined();

  const gameData = (await gameRef.get()).data();
  expect(gameData?.club.path).toBe(clubPath);
  expect(gameData?.table.path).toBe(tablePath);
  expect(gameData?.mode).toBeUndefined();
  expect(gameData?.state).toStrictEqual({});
});

it("should delete game if corresponding table is removed", async function() {
  const tableRef = await createTable();
  await sleep(1000); // wait for cloud trigger
  const gameRef = await getGameRef(tableRef);
  expect(gameRef.path).toBeDefined();

  await tableRef.delete();
  await sleep(1000); // wait for cloud trigger
  const gameSnapshot = await gameRef.get();
  expect(gameSnapshot.exists).toBeFalsy();
});
