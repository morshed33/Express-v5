/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express"
import { CREATED, OK, UNAUTHORIZED } from "../../constants/http"
import appAssert from "../../utils/appAssert"
import { emailSchema, loginSchema, registerSchema, resetPasswordSchema, verificationCodeSchema } from "../schemas/auth.schema"
import { clearAuthCookies, getAccessTokenCookieOptions, getRefreshTokenCookieOptions, setAuthCookies } from "../../utils/cookies"
import { verifyToken } from "../../utils/jwt"
import SessionModel from "../models/session.model"
import { createAccount, loginUser, refreshUserAccessToken, resetPassword, sendPasswordResetEmail, verifyEmail } from "../services/auth.service"

export const registerHandler = async (req: Request, res: Response) => {
  const request = registerSchema.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });
  const { user, accessToken, refreshToken } = await createAccount(request);
  
  setAuthCookies({ res, accessToken, refreshToken })
    .status(CREATED)
    .json({ success: true, message: "User registered successfully", data : user });
};

export const loginHandler = async (req: Request, res: Response) => {
  const request = loginSchema.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });
  const { accessToken, refreshToken } = await loginUser(request);

  // console.log("accessToken", accessToken);
  // console.log("refreshToken", refreshToken);

  setAuthCookies({ res, accessToken, refreshToken })
    .status(OK)
    .json({ success: true, message: "Login successful" });
};

export const logoutHandler = async (req: Request, res: Response) => {
  const accessToken = req.cookies.accessToken as string | undefined;
  const { payload } = verifyToken(accessToken || "");

  if (payload) await SessionModel.findByIdAndDelete(payload.sessionId);

  clearAuthCookies(res)
    .status(OK)
    .json({ success: true, message: "Logout successful" });
};

export const refreshHandler = async (req: Request, res: Response): Promise<any> => {

  const refreshToken = req.cookies.refreshToken as string | undefined;
  console.log("refreshToken", refreshToken);
  appAssert(refreshToken, UNAUTHORIZED, "Missing refresh token");

  const { accessToken, newRefreshToken } = await refreshUserAccessToken(refreshToken);
  if (newRefreshToken) {
    res.cookie("refreshToken", newRefreshToken, getRefreshTokenCookieOptions());
  }
  return res
    .status(OK)
    .cookie("accessToken", accessToken, getAccessTokenCookieOptions())
    .json({ success: true, message: "Access token refreshed" });
};

export const verifyEmailHandler = async (req: Request, res: Response) : Promise<any> => {
  const verificationCode = verificationCodeSchema.parse(req.params.code);
  await verifyEmail(verificationCode);
  return res.status(OK).json({ success: true, message: "Email was successfully verified" });
};

export const sendPasswordResetHandler = async (req: Request, res: Response) : Promise<any> => {
  const email = emailSchema.parse(req.body.email);
  await sendPasswordResetEmail(email);
  return res.status(OK).json({ success: true, message: "Password reset email sent" });
};

export const resetPasswordHandler = async (req: Request, res: Response) : Promise<any> => {
  const request = resetPasswordSchema.parse(req.body);
  await resetPassword(request);
  return clearAuthCookies(res)
    .status(OK)
    .json({ success: true, message: "Password was reset successfully" });
};
