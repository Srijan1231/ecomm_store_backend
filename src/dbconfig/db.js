import mongoose from "mongoose";

export const mongoConnect = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    conn && console.log("mongodb connected");
  } catch (error) {
    console.log(error);
  }
};
