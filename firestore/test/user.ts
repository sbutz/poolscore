import { readFileSync } from 'fs';
import { assertFails, initializeTestEnvironment, RulesTestEnvironment } from '@firebase/rules-unit-testing';
import {
  setLogLevel, setDoc, doc, getDoc,
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
    await setDoc(doc(context.firestore(), 'user/123'), { id: 1 });
  });

  const unauthenticatedDb = testEnv.unauthenticatedContext().firestore();
  await assertFails(getDoc(doc(unauthenticatedDb, 'user/123')));
});
