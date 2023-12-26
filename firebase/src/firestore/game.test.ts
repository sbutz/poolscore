import { readFileSync } from 'fs';
import {
  assertFails, assertSucceeds, initializeTestEnvironment, RulesTestEnvironment,
} from '@firebase/rules-unit-testing';
import {
  setLogLevel, setDoc, doc, getDoc, updateDoc,
} from 'firebase/firestore';

let testEnv: RulesTestEnvironment;
const clubId = 'bc73';
const clubName = 'bc73';
const clubPath = `clubs/${clubId}`;
const tableId = 'Table 1';
const tablePath = `clubs/${clubId}/tables/${tableId}`;
const gameId = '123';
const gamePath = `games/${gameId}`;

beforeAll(async () => {
  // Silence expected rules rejections from Firestore SDK. Unexpected rejections
  // will still bubble up and will be thrown as an error (failing the tests).
  setLogLevel('error');

  testEnv = await initializeTestEnvironment({
    firestore: {
      rules: readFileSync('firestore.rules', 'utf8'),
    },
  });
});

beforeEach(async () => {
  await testEnv.withSecurityRulesDisabled(async (context) => {
    const db = context.firestore();
    const clubRef = doc(db, clubPath);
    await setDoc(doc(db, clubPath), { name: clubName });
    const tableRef = doc(db, tablePath);
    await setDoc(tableRef, { foo: 'bar' });
    await setDoc(doc(db, gamePath), { club: clubRef, table: tableRef });
  });
});

afterEach(async () => {
  await testEnv.clearFirestore();
});

afterAll(async () => {
  await testEnv.cleanup();
});

it('should allow read access to game for club and table admins', async () => {
  const clubAdminDb = testEnv.authenticatedContext('alice', { clubId, admin: true }).firestore();
  await assertSucceeds(getDoc(doc(clubAdminDb, gamePath)));

  const tableAdminDb = testEnv.authenticatedContext('alice', { clubId, tableId }).firestore();
  await assertSucceeds(getDoc(doc(tableAdminDb, gamePath)));

  const aliceDb = testEnv.authenticatedContext('alice').firestore();
  await assertFails(getDoc(doc(aliceDb, gamePath)));

  const unauthenticatedDb = testEnv.unauthenticatedContext().firestore();
  await assertFails(getDoc(doc(unauthenticatedDb, gamePath)));
});

it('should allow write access to state and mode for table admins', async () => {
  const clubAdminDb = testEnv.authenticatedContext('alice', { clubId, admin: true }).firestore();
  await assertFails(updateDoc(doc(clubAdminDb, gamePath), { mode: '8' }));

  const tableAdminDb = testEnv.authenticatedContext('alice', { clubId, tableId }).firestore();
  await assertSucceeds(updateDoc(doc(tableAdminDb, gamePath), { mode: '8', state: {} }));
  await assertFails(updateDoc(doc(tableAdminDb, gamePath), { table: 'foo' }));

  const aliceDb = testEnv.authenticatedContext('alice').firestore();
  await assertFails(updateDoc(doc(aliceDb, gamePath), { mode: '8' }));

  const unauthenticatedDb = testEnv.unauthenticatedContext().firestore();
  await assertFails(updateDoc(doc(unauthenticatedDb, gamePath), { foo: '8' }));
});
