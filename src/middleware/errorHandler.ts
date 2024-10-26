import { Response, Request, NextFunction, ErrorRequestHandler } from "express";
import AppError from "../utils/AppError";
import { INTERNAL_SERVER_ERROR } from "../constants/http";

const handleAppError = (res: Response, error: AppError) => {
  res.status(error.statusCode).json({
    success: false,
    message: error.message,
    errorCode: error.errorCode,
  });
};

const errorHandler: ErrorRequestHandler = (
  error: unknown,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  console.error(`Error on ${req.method} ${req.path}:`, error);

  if (error instanceof AppError) {
    handleAppError(res, error);
  } else {
    res.status(INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "An unexpected error occurred.",
    });
  }
};

export default errorHandler;
