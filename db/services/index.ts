import mongoose from "mongoose";
import Contact from "../../models/Contact";
import { DbContact, ContactPost } from "../../types/contact";

export const createContact = async (contact: ContactPost) => {
  const newConatct = await Contact.create(contact);
  return await newConatct.save();
};

export const userExist = async (email: string) => {
  const user = await Contact.findOne({ email }).exec();
  if (user) return true;
  return false;
};

export const getAllContacts = async () => {
  const conatcts = await Contact.find({});
  return conatcts;
};

export const getContactById = async (id: string) => {
  const contact = await Contact.findById(id);
  return contact;
};
