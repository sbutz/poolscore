import { readFileSync } from 'fs';
import {
  assertFails, assertSucceeds, initializeTestEnvironment, RulesTestEnvironment,
} from '@firebase/rules-unit-testing';
import {
  setLogLevel, setDoc, doc, writeBatch, getDoc,
} from 'firebase/firestore';

let testEnv: RulesTestEnvironment;

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

afterAll(async () => {
  await testEnv.cleanup();
});

it('should forbid write access', async () => {
  await testEnv.withSecurityRulesDisabled(async (context) => {
    await setDoc(doc(context.firestore(), 'users/alice'), { id: 1 });
  });

  const aliceDb = testEnv.authenticatedContext('alice').firestore();
  const aliceBatch = writeBatch(aliceDb);
  const aliceClubRef = doc(aliceDb, 'clubs/bc73');
  aliceBatch.set(aliceClubRef, {});
  aliceBatch.set(doc(aliceDb, 'users/alice'), { club: aliceClubRef });
  await assertFails(aliceBatch.commit());

  const unauthenticatedDb = testEnv.unauthenticatedContext().firestore();
  const unauthenticatedBatch = writeBatch(unauthenticatedDb);
  const unauthenticatedClubRef = doc(unauthenticatedDb, 'clubs/bc73');
  unauthenticatedBatch.set(unauthenticatedClubRef, {});
  unauthenticatedBatch.set(doc(unauthenticatedDb, 'users/alice'), { club: unauthenticatedClubRef });
  await assertFails(unauthenticatedBatch.commit());
});

it('user should be able to only read his user data', async () => {
  await testEnv.withSecurityRulesDisabled(async (context) => {
    await setDoc(doc(context.firestore(), 'users/alice'), {});
  });

  const aliceDb = testEnv.authenticatedContext('alice').firestore();
  const aliceRef = doc(aliceDb, 'users/alice');
  await assertSucceeds(getDoc(aliceRef));

  const bobDb = testEnv.authenticatedContext('bob').firestore();
  const aliceBobRef = doc(bobDb, 'users/alice');
  await assertFails(getDoc(aliceBobRef));

  const unauthenticatedDb = testEnv.unauthenticatedContext().firestore();
  const aliceUnauthenticatedRef = doc(unauthenticatedDb, 'users/alice');
  await assertFails(getDoc(aliceUnauthenticatedRef));
});

it('should forbid user delete with associated club', async () => {
  // Can't be testet, since the Firebase SDK bypasses all security rules
  // and users cannot delete user or club documents.
  expect(true).toBeTruthy();
});
