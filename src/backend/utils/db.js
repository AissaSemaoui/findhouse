import mongoose from "mongoose";

let cachedDb = null;

export const connectToDatabase = async () => {
  if (cachedDb) return cachedDb;

  return mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "findhouse-app",
    })
    .then((db) => {
      cachedDb = db;
      console.log(`Database Connected on ${db.connection.host}`);
    })
    .catch((error) => {
      cachedDb = null;
      throw new Error(error);
    });
};
