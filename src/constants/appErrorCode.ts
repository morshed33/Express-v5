/* eslint-disable no-unused-vars */
enum AppErrorCode {
  EmailExists = "EMAIL_EXISTS",
  InvalidCredentials = "INVALID_CREDENTIALS",
  UserNotExists = "USER_NOT_EXISTS",
  InvalidAccessToken = "INVALID_ACCESS_TOKEN",
  InvalidRefreshToken = "INVALID_REFRESH_TOKEN",
  PasswordResetTokenExpired = "PASSWORD_RESET_TOKEN_EXPIRED",
  PasswordResetTokenInvalid = "PASSWORD_RESET_TOKEN_INVALID",
}

export default AppErrorCode
