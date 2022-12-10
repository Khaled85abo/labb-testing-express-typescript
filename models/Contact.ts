import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  personalnumber: String,
  address: String,
  zipCode: String,
  city: String,
  country: String,
});
const Contact = mongoose.model("contact", contactSchema);

export default Contact;

export const isValid = (id: string) => mongoose.isValidObjectId(id);
