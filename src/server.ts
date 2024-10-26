import connectDB from "./db";
import app from "./app";
import { Connection } from "mongoose";
import { PORT } from "./constants/env";

connectDB()
  .then((connection: Connection | undefined): void => {
    app.listen(PORT, () => {
      console.log(`\n⚙️  Server is running at port : ${PORT}`);
    });
    console.log(`\n📚 Database connected with ${connection?.host}`);
  })
  .catch((err) => {
    console.log("\n⚠️ MONGO DB connection failed !!! ", err);
  });
