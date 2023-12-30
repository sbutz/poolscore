import { readFileSync } from 'fs';
import { assertFails, initializeTestEnvironment, RulesTestEnvironment } from '@firebase/rules-unit-testing';
import { uploadString, getBytes } from 'firebase/storage';

let testEnv: RulesTestEnvironment;
const clubId = 'bc73';
const fileName = 'foo.txt';

beforeAll(async () => {
  testEnv = await initializeTestEnvironment({
    storage: {
      rules: readFileSync('storage.rules', 'utf8'),
    },
  });
});

afterEach(async () => {
  await testEnv.clearStorage();
});

afterAll(async () => {
  await testEnv.cleanup();
});

it('should forbid abitrary read/write access', async () => {
  const unauthenticatedContext = testEnv.unauthenticatedContext();
  await assertFails(uploadString(unauthenticatedContext.storage().ref(fileName), '123'));

  const authenticatedContext = testEnv.authenticatedContext('alice', { clubId, admin: true });
  await assertFails(uploadString(authenticatedContext.storage().ref(fileName), '123'));

  await testEnv.withSecurityRulesDisabled(async (context) => {
    await uploadString(context.storage().ref(fileName), '123');
  });
  await assertFails(getBytes(authenticatedContext.storage().ref(fileName)));
});
