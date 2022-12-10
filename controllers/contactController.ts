import {
  validateEmail,
  validatePersonalNumber,
  validateText,
  validateZipCode,
} from "../validation";
import { Request, Response } from "express";
import { getGeoCoor } from "../external-api";
import { isValid } from "../models/Contact";

export const createContact = async (req: Request, res: Response) => {
  // validate post data
  const errors = [...validateText(req.body)];

  const { zipCode, personalnumber, email } = req.body;
  if (!email || !validateEmail(email)) {
    errors.push({ error: "email is not valid" });
  }
  if (!zipCode || !validateZipCode(zipCode)) {
    errors.push({ error: "Zip code must be valid" });
  }
  if (!personalnumber || !validatePersonalNumber(personalnumber)) {
    errors.push({ error: "personal number is not valid" });
  }
  if (errors.length > 0) {
    res.status(400).json(errors);
  } else {
    const contact = await req.createContact(req.body);
    res.status(201).json(contact);
  }
};

export const getContact = async (req: Request, res: Response) => {
  const contacts = await req.getAllContacts();
  res.status(200).json(contacts);
};

export const getContacts = async (req: Request, res: Response) => {
  if (!isValid(req.params.id)) {
    res.status(400).send();
  } else {
    const contact = await req.getContactById(req.params.id);
    if (!contact) {
      res.status(404).send();
    } else {
      const coordinates = await getGeoCoor(contact.country, contact.city);
      if (Array.isArray(coordinates)) {
        res.json({
          _id: contact._id,
          firstname: contact.firstname,
          lastname: contact.lastname,
          city: contact.city,
          country: contact.country,
          email: contact.email,
          address: contact.address,
          personalnumber: contact.personalnumber,
          zipCode: contact.zipCode,
          latitude: coordinates[0].latitude,
          longitude: coordinates[0].longitude,
        });
      }
    }
  }
};
