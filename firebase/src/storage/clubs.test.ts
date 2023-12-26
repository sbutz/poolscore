import { readFileSync } from 'fs';
import { assertFails, assertSucceeds, initializeTestEnvironment, RulesTestEnvironment } from '@firebase/rules-unit-testing';
import { uploadString, getBytes, StringFormat } from 'firebase/storage';

let testEnv: RulesTestEnvironment;
const clubId = 'bc73';
const logoPath = `clubs/${clubId}/logo.jpg`;
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

// deny other than logo.jpg
// deny large files
// deny wrong content type
// deny write for non-admin
// allow correct and as admin
// any club member should download

it('should only allow to update logo', async () => {
  const adminStorage = testEnv.authenticatedContext('alice', { clubId, admin: true }).storage();
  await assertFails(uploadString(adminStorage.ref(fooPath), '123', StringFormat.RAW, { contentType: "image/jpeg"}));
});

it('should only allow jpeg images', async () => {
  const adminStorage = testEnv.authenticatedContext('alice', { clubId, admin: true }).storage();
  await assertFails(uploadString(adminStorage.ref(logoPath), '123', StringFormat.RAW, { contentType: "image/png"}));
});

it('should only allow images up to 512kb', async () => {
  const adminStorage = testEnv.authenticatedContext('alice', { clubId, admin: true }).storage();
  await assertFails(uploadString(adminStorage.ref(logoPath), '0'.repeat(512*1024+1), StringFormat.RAW, { contentType: "image/jpeg"}));
});

it('should allow create and update correct data', async () => {
  const adminStorage = testEnv.authenticatedContext('alice', { clubId, admin: true }).storage();
  await assertSucceeds(uploadString(adminStorage.ref(logoPath), '123', StringFormat.RAW, { contentType: "image/jpeg"}));
  await assertSucceeds(uploadString(adminStorage.ref(logoPath), '1234', StringFormat.RAW, { contentType: "image/jpeg"}));
});

it('should allow read for all club members', async () => {
  const adminStorage = testEnv.authenticatedContext('alice', { clubId }).storage();
  await assertSucceeds(getBytes(adminStorage.ref(logoPath)));
});
