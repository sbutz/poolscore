import { readFileSync } from 'fs';
import {
  assertFails, assertSucceeds, initializeTestEnvironment, RulesTestEnvironment,
} from '@firebase/rules-unit-testing';
import {
  setLogLevel, setDoc, doc, getDoc, deleteDoc,
} from 'firebase/firestore';

let testEnv: RulesTestEnvironment;
const clubId = 'bc73';
const clubName = 'bc73';
const clubPath = `clubs/${clubId}`;
const tableId = 'Table 1';
const tablePath = `clubs/${clubId}/tables/${tableId}`;

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
    await setDoc(doc(db, clubPath), { name: clubName });
    await setDoc(doc(db, tablePath), { foo: 'bar' });
  });
});

afterEach(async () => {
  await testEnv.clearFirestore();
});

afterAll(async () => {
  await testEnv.cleanup();
});

it('should forbid access to club for non club members', async () => {
  const aliceDb = testEnv.authenticatedContext('alice').firestore();
  await assertFails(getDoc(doc(aliceDb, clubPath)));

  const unauthenticatedDb = testEnv.unauthenticatedContext().firestore();
  await assertFails(getDoc(doc(unauthenticatedDb, clubPath)));
});

it('should allow read club', async () => {
  const adminDb = testEnv.authenticatedContext('alice', { clubId, admin: true }).firestore();
  const adminClubData = await getDoc(doc(adminDb, clubPath));
  expect(adminClubData.data().name).toBe(clubName);

  const nonAdminDb = testEnv.authenticatedContext('bob', { clubId }).firestore();
  const nonAdminClubData = await getDoc(doc(nonAdminDb, clubPath));
  expect(nonAdminClubData.data().name).toBe(clubName);
});

it('should forbid arbitray updates on club', async () => {
  const adminDb = testEnv.authenticatedContext('alice', { clubId, admin: true }).firestore();
  await assertFails(setDoc(doc(adminDb, clubPath), { foo: 'bar' }));

  const nonAdminDb = testEnv.authenticatedContext('alice', { clubId }).firestore();
  await assertFails(setDoc(doc(nonAdminDb, clubPath), { foo: 'bar' }));
});

it('should allow update club name for admins', async () => {
  const adminDb = testEnv.authenticatedContext('alice', { clubId, admin: true }).firestore();
  await assertSucceeds(setDoc(doc(adminDb, clubPath), { name: 'foo' }));

  const nonAdminDb = testEnv.authenticatedContext('alice', { clubId }).firestore();
  await assertFails(setDoc(doc(nonAdminDb, clubPath), { name: 'foo' }));
});

it('should allow read tables for admins ', async () => {
  const adminDb = testEnv.authenticatedContext('alice', { clubId, admin: true }).firestore();
  await assertSucceeds(getDoc(doc(adminDb, tablePath)));

  const nonAdminDb = testEnv.authenticatedContext('alice', { clubId }).firestore();
  assertFails(getDoc(doc(nonAdminDb, tablePath)));
});

it('should allow create tables for admins ', async () => {
  const adminDb = testEnv.authenticatedContext('alice', { clubId, admin: true }).firestore();
  assertSucceeds(setDoc(doc(adminDb, tablePath), {}));

  const nonAdminDb = testEnv.authenticatedContext('alice', { clubId }).firestore();
  assertFails(setDoc(doc(nonAdminDb, tablePath), {}));
});

it('should allow delete tables for admins', async () => {
  const nonAdminDb = testEnv.authenticatedContext('alice', { clubId }).firestore();
  assertFails(deleteDoc(doc(nonAdminDb, tablePath)));

  const adminDb = testEnv.authenticatedContext('alice', { clubId, admin: true }).firestore();
  assertSucceeds(deleteDoc(doc(adminDb, tablePath)));
});

it('should forbid write tables for admins', async () => {
  const adminDb = testEnv.authenticatedContext('alice', { clubId, admin: true }).firestore();
  assertFails(setDoc(doc(adminDb, tablePath), { foo: 'bar' }));

  const nonAdminDb = testEnv.authenticatedContext('alice', { clubId }).firestore();
  assertFails(setDoc(doc(nonAdminDb, tablePath), { foo: 'bar' }));
});
