import mongoose from "mongoose";

export default async function connectDB() {
  try {
    if (!process.env.MONGODB_URL) {
      console.log("Mongodb url: ", process.env.MONGODB_URL);
    } else {
      await mongoose.connect(process.env.MONGODB_URL);
      console.log("Connected to mongoose");
    }
  } catch (e) {
    console.log("Error connecting to Mongo database: ", e);
  }
}
