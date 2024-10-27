// Swagger definition
export const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Express v5 API",
      description: "API documentation for Express v5 application.",
      version: "1.0.0",
    },
    servers: [
      {
        url: "https://express-v5.vercel.app",
        description: "Production server",
      },
      {
        url: "https://express-v5.onrender.com",
        description: "Production server on Render",
      },
      {
        url: "http://localhost:8000",
        description: "Local server",
      },
    ],
    tags : [
      {
        name: "Test",
        description: "Test routes"
      },
      {
        name: "Auth",
        description: "Auth routes"
      }
    ],
    paths: {
    //   Test routes
      "/test/asyncErrorDemo": {
        get: {
          summary: "Test Async Error Demo",
          tags: ["Test"],
          responses: {
            "500": {
              description: "Internal Server Error",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: {
                        type: "boolean",
                        example: false,
                      },
                      message: {
                        type: "string",
                        example: "TEST ERROR",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      "/test": {
        get: {
          summary: "Test Health Check",
          tags: ["Test"],
          responses: {
            "200": {
              description: "Health check successful",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: {
                        type: "boolean",
                        example: true,
                      },
                      message: {
                        type: "string",
                        example: "TEST ROUTES 📍",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },

      // Auth routes
      "/auth/register": {
        post: {
          summary: "Register a new user",
          tags: ["Auth"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    email: {
                      type: "string",
                      example: "smofju@gmail.com",
                    },
                    password: {
                      type: "string",
                      example: "123123",
                    },
                    confirmPassword: {
                      type: "string",
                      example: "123123",
                    },
                  },
                },
              },
            },
          },
          responses: {
            "201": {
              description: "User registered successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: {
                        type: "boolean",
                        example: true,
                      },
                      message: {
                        type: "string",
                        example: "User registered successfully",
                      },
                      data : {
                        type: "object",
                        properties: {
                          email: {
                            type: "string",
                            example: "smofju@gmail.com",
                          },
                          verified: {
                            type: "boolean",
                            example: true,
                          },
                          createdAt: {
                            type: "string",
                            example: "2023-10-26T18:43:03.000Z",
                          },
                          updatedAt: {
                            type: "string",
                            example: "2023-10-26T18:43:03.000Z",
                          },
                        }
                      }
                    },
                  },
                },
              },
            },
            "409": {
              description: "Email already in use",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: {
                        type: "boolean",
                        example: false,
                      },
                      message: {
                        type: "string",
                        example: "Email already in use",
                      },
                      errorCode: {
                        type: "string",
                        example: "EMAIL_EXISTS",
                      },
                    },
                  },
                },
              },
            }
          },
        },
      },
      "/auth/login": {
        post: {
          summary: "Login a user",
          tags: ["Auth"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    email: {
                      type: "string",
                      example: "smofju@gmail.com",
                    },
                    password: {
                      type: "string",
                      example: "111111",
                    },
                  },
                },
              },
            },
          },
          responses: {
            "200": {
              description: "User logged in successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: {
                        type: "boolean",
                        example: true,
                      },
                      message: {
                        type: "string",
                        example: "Login successful",
                      },
                    },
                  },
                },
              },
            },
            "400": {
              description: "Error: Bad request",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: {
                        type: "boolean",
                        example: false,
                      },
                      errors: {
                        type: "object",
                        properties: {
                          path: {
                            type: "string",
                            example: "email",
                          },
                          message: {
                            type: "string",
                            example: "Required",
                          },
                        },
                      },
                      message: {
                        type: "string",
                        example: "[\n  {\n    \"code\": \"invalid_type\",\n    \"expected\": \"string\",\n    \"received\": \"undefined\",\n    \"path\": [\n      \"email\"\n    ],\n    \"message\": \"Required\"\n  }\n]",
                      },
                    },
                  }
                },
              },
            },
            "401": {
              description: "Error: Invalid credentials",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: {
                        type: "boolean",
                        example: false,
                      },
                      message: {
                        type: "string",
                        example: "Invalid email or password",
                      },
                      errorCode: {
                        type: "string",
                        example: "INVALID_CREDENTIALS",
                      },
                    },
                  },
                },
              },
            },
            "404": {
              description: "Error: User not found",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: {
                        type: "boolean",
                        example: false,
                      },
                      message: {
                        type: "string",
                        example: "User not found",
                      },
                      errorCode: {
                        type: "string",
                        example: "USER_NOT_EXISTS",
                      },
                    },
                  }, 
                },
              } 
            }
          },
        },
      },
      "/auth/refresh": {
        get: {
          summary: "Refresh authentication token",
          tags: ["Auth"],
          responses: {
            "200": {
              description: "Token refreshed successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: {
                        type: "boolean",
                        example: true,
                      },
                      accessToken: {
                        type: "string",
                        example: "new-access-token",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      "/auth/logout": {
        get: {
          summary: "Logout a user",
          tags: ["Auth"],
          responses: {
            "200": {
              description: "User logged out successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: {
                        type: "boolean",
                        example: true,
                      },
                      message: {
                        type: "string",
                        example:
                                                    "Logged out successfully",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      "/auth/email/verify/{code}": {
        get: {
          summary: "Verify email",
          tags: ["Auth"],
          parameters: [
            {
              name: "code",
              in: "path",
              required: true,
              description: "Verification code",
              schema: { type: "string" },
            },
          ],
          responses: {
            "200": {
              description: "Email verified successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: {
                        type: "boolean",
                        example: true,
                      },
                      message: {
                        type: "string",
                        example:
                                                    "Email verified successfully",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      "/auth/password/forgot": {
        post: {
          summary: "Request password reset",
          tags: ["Auth"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    email: {
                      type: "string",
                      example: "smofju@gmail.com",
                    },
                  },
                },
              },
            },
          },
          responses: {
            "200": {
              description: "Password reset link sent",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: {
                        type: "boolean",
                        example: true,
                      },
                      message: {
                        type: "string",
                        example:
                                                    "Password reset email sent",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      "/auth/password/reset": {
        post: {
          summary: "Reset password",
          tags: ["Auth"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    verificationCode: {
                      type: "string",
                      example: "671dd743d399d3946ab58171",
                    },
                    password: {
                      type: "string",
                      example: "111111",
                    },
                  },
                },
              },
            },
          },
          responses: {
            "200": {
              description: "Password reset successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: {
                        type: "boolean",
                        example: true,
                      },
                      message: {
                        type: "string",
                        example:
                                                    "Password reset successfully",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  apis: ["./app/routes/test/*.ts", "./app/routes/auth/*.ts"], // Adjusted for separate folders
}
