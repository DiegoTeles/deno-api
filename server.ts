import { Application } from "https://deno.land/x/abc@v1.0.0-rc2/mod.ts";
import { ErrorMiddleware } from "./utils/handleError.ts";

import {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser
} from "./controllers/Users/index.ts";

const app = new Application();

app.use(ErrorMiddleware);

app
.get("/allusers", getAllUsers)
  .post("/create", createUser)
  .get("/user/:id", getUser)
  .put("/user/:id", updateUser)
  .delete("/user/:id", deleteUser)
  .start({ port: 4000 });

console.log(`server listening on http://localhost:4000`);


