import express, { Application, Request, Response } from "express";
import cors from "cors";
import errorHandler from "./middleware/errorHandler";
import morgan from "morgan";
import testRoutes from "./app/routes/test.routes";
import { NOT_FOUND } from "./constants/http";

const app: Application = express();

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "16kb" }));
app.use(express.static("public"));


app.use(morgan("dev"));

// PING
app.get("/", async (req: Request, res: Response) => {
  res.status(200).json({ success: true, message: "SERVER Pinging... 📍" });
});

// ROUTES
app.use("/test", testRoutes);

app.use(errorHandler);

// NOT FOUND
app.use((req: Request, res: Response) => {
  res.status(NOT_FOUND).json({
    success: false,
    message: "The requested resource could not be found with the given path and method.",
  });
});

export default app;
