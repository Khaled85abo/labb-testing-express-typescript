import express, { json, Request, Response } from "express";
import { contact } from "./routes/contact";
import { Contact, ContactPost, DbContact } from "./types/contact";

type makeAppProps = {
  createContact: (conatct: ContactPost) => Promise<DbContact | undefined>;
  getAllContacts: () => Promise<Contact[]>;
  getContactById: (id: string) => Promise<Contact | undefined>;
};

const app = express();
app.use(json());
app.use("/api/contact", contact);

export default app;
