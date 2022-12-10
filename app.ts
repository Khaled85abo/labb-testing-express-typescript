import express, { json, Request, Response } from "express";
import { Contact, ContactPost, DbContact } from "./types/contact";
import {
  validateEmail,
  validatePersonalNumber,
  validateZipCode,
} from "./validation";
type makeAppProps = {
  createContact: (conatct: ContactPost) => Promise<DbContact | undefined>;
  getAllContacts: () => Promise<Contact[]>;
  getContactById: (id: string) => Promise<Contact | undefined>;
};

const makeApp = ({ createContact, getAllContacts, getContactById }: any) => {
  const app = express();
  app.use(json());
  // app.use(urlencoded())

  app.get("/api/healthcheck", (req: Request, res: Response) => {
    res.status(200).json({ msg: "Your app is healthy and running" });
  });

  app.post("/api/contact", async (req: Request, res: Response) => {
    // validate post data
    const errors = [];
    const properties = [
      "zipCode",
      "personalnumber",
      "email",
      "firstname",
      "lastname",
      "address",
      "city",
      "country",
    ];
    const { zipCode, personalnumber, email } = req.body;
    for (let property of properties) {
      if (!req.body[property] || req.body[property].length == 0) {
        errors.push(`${property} should have valid value`);
      }
    }
    if (!email || !validateEmail(email)) {
      errors.push("email is not valid");
    }
    if (!zipCode || !validateZipCode(zipCode)) {
      errors.push("Zip code must be valid");
    }
    if (!personalnumber || !validatePersonalNumber(personalnumber)) {
      errors.push("personal number is not valid");
    }
    if (errors.length > 0) {
      res.status(400).json(errors);
    } else {
      try {
        const contact = await createContact(req.body);
        res.status(201).json(contact);
      } catch (err) {
        res.status(500);
      }
    }
  });
  return app;
};

export default makeApp;
