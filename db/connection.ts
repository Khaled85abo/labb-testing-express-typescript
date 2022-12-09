import mongoose from "mongoose";

const connect = async () => {
  try {
    if (process.env.MONGODB_URL)
      await mongoose.connect(process.env.MONGODB_URL);
  } catch (e) {
    console.log("errro connecting to database: ", e);
  }
};

export default connect;
