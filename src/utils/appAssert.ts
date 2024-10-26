import assert from "node:assert";
import AppError from "./AppError";
import { HttpStatusCode } from "../constants/http";
import AppErrorCode from "../constants/appErrorCode";

type AppAssert = (
  condition: boolean | undefined | null,
  _httpStatusCode: HttpStatusCode,
  _message: string,
  _appErrorCode?: AppErrorCode
) => asserts condition;

/**
 * Asserts a condition and throws an AppError if the condition is falsy.
 */
const appAssert: AppAssert = (
  condition,
  httpStatusCode,
  message,
  appErrorCode
) => {
  assert(condition, new AppError(httpStatusCode, message, appErrorCode));
};

export default appAssert;
