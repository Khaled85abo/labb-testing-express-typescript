import makeApp from "./app";
import { createContact, getAllContacts, getContactById } from "./db/services";
import * as dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 8081;
import connect from "./db/connection";

const app = makeApp({
  createContact,
  getAllContacts,
  getContactById,
});

console.log("server.ts file");

connect().then(() => {
  app.listen(PORT, () => {
    console.log("server running on port: ", PORT);
  });
});
