import { Router } from "express";
import * as contactController from "../controllers/contactController";
import { contactServices } from "../db/services";

export const contact = Router();

contact.use(contactServices);
contact
  .route("/")
  .post(contactController.createContact)
  .get(contactController.getContacts);
contact.route("/:id").get(contactController.getContact);
