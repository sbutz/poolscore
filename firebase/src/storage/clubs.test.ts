import { readFileSync } from 'fs';
import {
  assertFails, assertSucceeds, initializeTestEnvironment, RulesTestEnvironment,
} from '@firebase/rules-unit-testing';
import { uploadString, getBytes, StringFormat } from 'firebase/storage';

let testEnv: RulesTestEnvironment;
const clubId = 'bc73';
const logoPath = `clubs/${clubId}/logo.jpeg`;
const fooPath = `clubs/${clubId}/foo.png`;

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

it('should only allow to update logo', async () => {
  const adminStorage = testEnv.authenticatedContext('alice', { clubId, admin: true }).storage();
  await assertFails(uploadString(adminStorage.ref(fooPath), '123', StringFormat.RAW, { contentType: 'image/jpeg' }));
});

it('should only allow jpeg images', async () => {
  const adminStorage = testEnv.authenticatedContext('alice', { clubId, admin: true }).storage();
  await assertFails(uploadString(adminStorage.ref(logoPath), '123', StringFormat.RAW, { contentType: 'image/png' }));
});

it('should only allow images up to 1Mb', async () => {
  const adminStorage = testEnv.authenticatedContext('alice', { clubId, admin: true }).storage();
  await assertFails(uploadString(adminStorage.ref(logoPath), '0'.repeat(1 * 1024 * 1024 + 1), StringFormat.RAW, { contentType: 'image/jpeg' }));
});

it('should allow create and update correct data', async () => {
  const adminStorage = testEnv.authenticatedContext('alice', { clubId, admin: true }).storage();
  await assertSucceeds(uploadString(adminStorage.ref(logoPath), '123', StringFormat.RAW, { contentType: 'image/jpeg' }));
  await assertSucceeds(uploadString(adminStorage.ref(logoPath), '1234', StringFormat.RAW, { contentType: 'image/jpeg' }));
});

it('should allow read for all club members', async () => {
  const adminStorage = testEnv.authenticatedContext('alice', { clubId }).storage();
  await assertSucceeds(getBytes(adminStorage.ref(logoPath)));
});
