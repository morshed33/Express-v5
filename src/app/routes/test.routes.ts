import { Router } from "express";
import appAssert from "../../utils/appAssert";
import { INTERNAL_SERVER_ERROR } from "../../constants/http";

const testRoutes = Router();

testRoutes.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "TEST ROUTES 📍" });
});

testRoutes.get("/asyncErrorDemo", async (req, res,) => {
  // const demoAsyncError = Promise.reject(new Error("Async Error Demo"));
  const me = 20;
  const she = 30;
  appAssert(me > she, INTERNAL_SERVER_ERROR, "TEST ERROR");
  res.status(200).json({ success: true, message: "Async Error Demo 📍" });
});

export default testRoutes;
