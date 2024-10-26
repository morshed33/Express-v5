import mongoose, { Connection } from "mongoose";
import { MONGO_URI } from "../constants/env";

const MAX_RETRIES = 50;
let retries = 0;

const connectDB = async (): Promise<Connection | undefined> => {
  try {
    const connectionInstance = await mongoose.connect(`${MONGO_URI}`);
    console.log("Successfully connected to the database");
    retries = 0;
    return connectionInstance.connection;
  } catch (error) {
    retries++;
    console.error(
      `Failed to connect to the database (Attempt ${retries}/${MAX_RETRIES}) ⚠️ \n ${error}`
    );

    if (retries >= MAX_RETRIES) {
      throw new Error("Max retries reached. Exiting...");
    }

    const retryDelay = Math.min(5000 * retries, 300000);

    setTimeout(() => {
      console.log(
        "Retrying to connect to the database...",
        `${retryDelay / 1000} seconds`
      );
      connectDB();
    }, retryDelay);

    return undefined;
  }
};

export default connectDB;
