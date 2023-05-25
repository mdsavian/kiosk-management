import mongoose from "mongoose";

async function connectDB() {
  const dbUriString = process.env.DB_URI as string;

  mongoose
    .connect(dbUriString)
    .then(() => {
      console.log("db connected");
    })
    .catch((error) => {
      console.error(`error connecting db ${error}`);
    });
}

export default connectDB;
