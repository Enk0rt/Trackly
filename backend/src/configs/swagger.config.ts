import { OpenAPIV3 } from "openapi-types";
import swaggerUi from "swagger-ui-express";

import { config } from "./config";

const swaggerDocument: OpenAPIV3.Document = {
    openapi: "3.0.0",
    info: {
        title: "Trackly API Documentation",
        version: "1.0.0",
        description:
            "API documentation for goals and habits tracking system, called Trackly",
    },
    servers: [
        {
            url: config.FRONTEND_URL,
            description: "Local server",
        },
    ],
    tags: [
        {
            name: "Auth",
            description: "Authentication endpoints",
        },
    ],
    paths: {
        "/api/auth/sign-up": {
            post: {
                tags: ["Auth"],
                summary: "Register a new user",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/UserSignUp",
                            },
                        },
                    },
                },
                // SIGN UP
                responses: {
                    "201": {
                        description: "User successfully registered",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        data: {
                                            type: "object",
                                            properties: {
                                                user: {
                                                    $ref: "#/components/schemas/User",
                                                },
                                            },
                                        },
                                        details: { type: "string" },
                                    },
                                },
                                example: {
                                    data: {
                                        user: {
                                            _id: "68429e5c510d0aba276992d6",
                                            name: "Alex",
                                            surname: "China",
                                            email: "12321324@gmail.com",
                                            isActive: false,
                                            isDeleted: false,
                                            isVerified: false,
                                            createdAt:
                                                "2025-06-06T07:53:00.116Z",
                                            updatedAt:
                                                "2025-06-06T07:53:00.116Z",
                                        },
                                    },
                                    details:
                                        "Sign up is successful, user is created",
                                },
                            },
                        },
                    },
                    "400": {
                        description: "Validation error or bad request",
                    },
                },
            },

            //  SIGN UP END   ------------------------------------------
        },
        "/api/auth/sign-in": {
            post: {
                tags: ["Auth"],
                summary: "Log in an existing user",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/UserSignIn",
                            },
                        },
                    },
                },
                responses: {
                    "200": {
                        description: "User successfully signed in",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        data: {
                                            $ref: "#/components/schemas/UserWithTokens",
                                        },
                                        details: {
                                            type: "string",
                                        },
                                    },
                                },
                            },
                        },
                    },
                    "400": {
                        description: "Invalid credentials",
                    },
                },
            },
            //     SIGN IN END -----------------------------
        },
        "/api/auth/me": {
            get: {
                tags: ["Auth"],
                summary: "Get current signed-in user",
                responses: {
                    "200": {
                        description: "Current user profile",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        data: {
                                            $ref: "#/components/schemas/User",
                                        },
                                    },
                                },
                            },
                        },
                    },
                    "401": {
                        description: "Unauthorized",
                    },
                },
            },
        },
        //     GET ME END ---------------------------------------
        "/api/auth/refresh": {
            get: {
                tags: ["Auth"],
                summary: "Refresh access and refresh tokens",
                responses: {
                    "200": {
                        description: "Tokens refreshed successfully",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        data: {
                                            $ref: "#/components/schemas/TokenPair",
                                        },
                                        details: {
                                            type: "string",
                                        },
                                    },
                                },
                            },
                        },
                    },
                    "401": {
                        description: "Unauthorized",
                    },
                },
            },
        },
        //     REFRESH END ------------------------------------------------
        "/api/auth/logout": {
            post: {
                tags: ["Auth"],
                summary: "Logout user (clear cookies)",
                responses: {
                    "200": {
                        description: "Logged out successfully",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        data: {
                                            type: null,
                                        },
                                        details: {
                                            type: "string",
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
    components: {
        schemas: {
            UserSignUp: {
                type: "object",
                required: ["username", "email", "password"],
                properties: {
                    username: { type: "string" },
                    email: { type: "string", format: "email" },
                    password: { type: "string", format: "password" },
                    name: { type: "string" },
                    surname: { type: "string" },
                },
            },
            UserSignIn: {
                type: "object",
                required: ["login", "password"],
                properties: {
                    login: {
                        type: "string",
                        description: "Can be either email or username",
                    },
                    password: { type: "string", format: "password" },
                },
            },
            User: {
                type: "object",
                properties: {
                    _id: { type: "string" },
                    username: { type: "string" },
                    email: { type: "string" },
                    name: { type: "string" },
                    surname: { type: "string" },
                    age: { type: "integer" },
                    city: { type: "string" },
                    avatar: { type: "string", nullable: true },
                    isVerified: { type: "boolean" },
                    isDeleted: { type: "boolean" },
                    isBlocked: { type: "boolean" },
                    createdAt: { type: "string", format: "date-time" },
                    updatedAt: { type: "string", format: "date-time" },
                },
            },
            TokenPair: {
                type: "object",
                properties: {
                    accessToken: { type: "string" },
                    refreshToken: { type: "string" },
                },
            },
            UserWithTokens: {
                type: "object",
                properties: {
                    user: { $ref: "#/components/schemas/User" },
                    tokens: { $ref: "#/components/schemas/TokenPair" },
                },
            },
        },
    },
};

export { swaggerDocument, swaggerUi };
