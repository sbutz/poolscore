import { auth } from "firebase-functions";

import createUser from "./createUser";


export default auth.user().beforeCreate((user) => createUser(user.uid));
