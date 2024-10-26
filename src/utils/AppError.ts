import AppErrorCode from "../constants/appErrorCode";
import { HttpStatusCode } from "../constants/http";

class AppError extends Error {
  public readonly statusCode: HttpStatusCode;
  public readonly errorCode?: AppErrorCode;

  constructor(
    statusCode: HttpStatusCode,
    message: string,
    errorCode?: AppErrorCode
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
  }
}

export default AppError;
