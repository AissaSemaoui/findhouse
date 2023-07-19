import mongoose from "mongoose";

export const connectToDatabase = async () => {
  mongoose
    .connect(
      "mongodb+srv://semaoui0347:Hdn3GMsHfvkQxwVw@nasacluster.hfmxup0.mongodb.net/",
      {
        dbName: "carwash-app",
      }
    )
    .then(({ connection }) =>
      console.log(`Database Connected on ${connection.host}`)
    )
    .catch((error) => {
      throw new Error(error);
    });
};
