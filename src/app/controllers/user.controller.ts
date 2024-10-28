/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import UserModel from "../models/user.model";
import appAssert from "../../utils/appAssert";
import { NOT_FOUND, OK } from "../../constants/http";


export const getUserHandler = (async (req : Request, res : Response) : Promise<any> => {
  console.log(req.userId, "req.userId");
  const user = await UserModel.findById(req.userId);
  appAssert(user, NOT_FOUND, "User not found");
  return res.status(OK).json(user.omitPassword());
});
