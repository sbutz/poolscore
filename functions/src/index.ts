import {beforeUserCreated} from "firebase-functions/v2/identity";

import {createClub, deleteClub} from "./createClub";
import {createJWT, createToken} from "./createToken";
import {createGame, deleteGame} from "./createGame";

export const club = {
  /*
   * Called before the creation of a user.
   * Exceptions:
   * - It is not called for Registrations with a custom token.
   * - It is not called by the emulators.
  */
  beforecreate: beforeUserCreated(async () => {
    return await createClub();
  }),
  deleteclub: deleteClub,
};

export const table = {
  createtoken: createToken,
  createjwt: createJWT,
  creategame: createGame,
  deletegame: deleteGame,
};
