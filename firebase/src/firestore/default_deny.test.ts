import { readFileSync } from 'fs';
import { assertFails, initializeTestEnvironment, RulesTestEnvironment } from '@firebase/rules-unit-testing';
import {
  addDoc, getDocs, collection, setLogLevel,
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

it('should forbid abitrary read/write access', async () => {
  await testEnv.withSecurityRulesDisabled(async (context) => {
    await addDoc(collection(context.firestore(), 'foo'), { id: 1 });
  });

  const aliceDb = testEnv.authenticatedContext('alice').firestore();
  await assertFails(getDocs(collection(aliceDb, 'foo')));
  await assertFails(addDoc(collection(aliceDb, 'bar'), { id: 2 }));

  const unauthenticatedDb = testEnv.unauthenticatedContext().firestore();
  await assertFails(getDocs(collection(unauthenticatedDb, 'foo')));
  await assertFails(addDoc(collection(unauthenticatedDb, 'bar'), { id: 1 }));
});
