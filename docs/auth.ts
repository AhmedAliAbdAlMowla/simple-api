export const signIn = {
  summary: "Signin",
  operationId: "signin",
  description: "you can use this end point to signin",
  parameters: [],
  responses: {
    "200": {
      description: "",
      headers: {},
    },
  },
  requestBody: {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
        },
        example: {
          email: "ahmedshekh@student.aast.edu",
          password: "#Secret123",
        },
      },
    },
  },
  tags: ["Auth"],
};

export const signup = {
  summary: "Signup",
  operationId: "signup",
  description: "you can use this end point to  signup",
  parameters: [],
  responses: {
    "200": {
      description: "",
      headers: {},
    },
  },
  requestBody: {
    required: true,
    content: {
      "application/json": {
        example: {
          firstName: "ahmed",
          lastName: "ali",
          email: "ahmedshekh@student.aast.edu",
          password: "#Secret123",
        },
        schema: { type: "object" },
      },
    },
  },
  tags: ["Auth"],
};

export const refreshToken = {
  summary: "Refresh token .",
  description: "you can use this end point to create new access and refresh tokens.",
  operationId: "create new access and refresh tokens.",
  responses: { "200": { description: "", headers: {} } },
  requestBody: {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
        },
        example: {
          refreshToken : "eyJhbGciOiJIUzI"
        },
      },
    },
  },
  tags: ["Auth"],
};
