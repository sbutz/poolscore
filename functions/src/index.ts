import {beforeUserCreated} from "firebase-functions/v2/identity";

import createUserAndClub from "./createUser";
import {createJWT, createToken} from "./createToken";

export const user = {
  /*
   * Called before the creation of a user.
   * Exceptions:
   * - It is not called for Registrations with a custom token.
   * - It is not called by the emulators.
  */
  beforecreate: beforeUserCreated((event) => {
    createUserAndClub(event.data.uid);
  }),
};

export const table = {
  createtoken: createToken,
  createjwt: createJWT,
};
