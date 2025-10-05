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
        {
            name: "Admin",
            description:
                "Admin endpoints for admin panel, created for administration users by admin",
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
        "/api/auth/verify/email": {
            post: {
                tags: ["Auth"],
                summary: "Send email verification request to the user",
                security: [{ bearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    email: {
                                        type: "string",
                                        example: "user@example.com",
                                    },
                                    name: { type: "string", example: "John" },
                                    username: {
                                        type: "string",
                                        example: "john_doe",
                                    },
                                },
                                required: ["email"],
                            },
                        },
                    },
                },
                responses: {
                    "200": {
                        description:
                            "Email verification request is successfully sent, check your email",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        data: { type: null },
                                        details: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        "/api/auth/verify/confirm/{token}": {
            get: {
                tags: ["Auth"],
                summary: "Verify user email by confirmation token",
                parameters: [
                    {
                        name: "token",
                        in: "path",
                        required: true,
                        schema: { type: "string" },
                        description: "Verification token sent to user email",
                    },
                ],
                responses: {
                    "200": {
                        description: "Email is successfully verified",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        data: {
                                            $ref: "#/components/schemas/User",
                                        },
                                        details: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        "/api/auth/recovery/password": {
            post: {
                tags: ["Auth"],
                summary: "Send password recovery request",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    email: {
                                        type: "string",
                                        example: "user@example.com",
                                    },
                                },
                                required: ["email"],
                            },
                        },
                    },
                },
                responses: {
                    "200": {
                        description:
                            "Password recovery request is successfully sent, check your email",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        data: { type: null },
                                        details: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        "/api/auth/recovery/confirm/{token}": {
            get: {
                tags: ["Auth"],
                summary: "Validate password recovery token",
                parameters: [
                    {
                        name: "token",
                        in: "path",
                        required: true,
                        schema: { type: "string" },
                    },
                ],
                responses: {
                    "200": {
                        description: "Token is valid for password recovery",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        data: {
                                            type: "object",
                                            properties: {
                                                _userId: { type: "string" },
                                                username: { type: "string" },
                                                role: { type: "string" },
                                            },
                                        },
                                        details: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                },
            },
            patch: {
                tags: ["Auth"],
                summary: "Recover password using token from email",
                parameters: [
                    {
                        name: "token",
                        in: "path",
                        required: true,
                        schema: { type: "string" },
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    newPass: {
                                        type: "string",
                                        example: "newSecurePassword123",
                                    },
                                },
                                required: ["newPass"],
                            },
                        },
                    },
                },
                responses: {
                    "200": {
                        description: "Password is changed successfully",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        data: {
                                            $ref: "#/components/schemas/User",
                                        },
                                        details: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        "/api/admin/users/params": {
            get: {
                tags: ["Admin"],
                summary: "Get all users with query parameters",
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: "page",
                        in: "query",
                        schema: { type: "integer", example: 1 },
                    },
                    {
                        name: "pageSize",
                        in: "query",
                        schema: { type: "integer", example: 10 },
                    },
                    {
                        name: "search",
                        in: "query",
                        schema: { type: "string", example: "john" },
                    },
                    {
                        name: "sort",
                        in: "query",
                        schema: { type: "string", example: "username" },
                    },
                    {
                        name: "sortDirection",
                        in: "query",
                        schema: {
                            type: "string",
                            enum: ["asc", "desc", 1, -1],
                            example: "asc",
                        },
                    },
                ],
                responses: {
                    "200": {
                        description: "Users fetched successfully",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        data: {
                                            type: "array",
                                            items: {
                                                $ref: "#/components/schemas/User",
                                            },
                                        },
                                        page: { type: "integer" },
                                        pageSize: { type: "integer" },
                                        total: { type: "integer" },
                                        totalPages: { type: "integer" },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },

        "/api/admin/block/{id}": {
            patch: {
                tags: ["Admin"],
                summary: "Block one user by ID",
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: { type: "string" },
                    },
                ],
                responses: {
                    "200": {
                        description: "User is blocked successfully",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        data: {
                                            $ref: "#/components/schemas/User",
                                        },
                                        details: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },

        "/api/admin/block": {
            patch: {
                tags: ["Admin"],
                summary: "Block multiple users",
                security: [{ bearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    ids: {
                                        type: "array",
                                        items: { type: "string" },
                                        example: [
                                            "65f4a8b3c2e...",
                                            "65f4a8b3c2e...",
                                        ],
                                    },
                                },
                                required: ["ids"],
                            },
                        },
                    },
                },
                responses: {
                    "200": {
                        description: "Users are blocked successfully",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        data: {
                                            type: "object",
                                            properties: {
                                                users: {
                                                    type: "array",
                                                    items: {
                                                        $ref: "#/components/schemas/User",
                                                    },
                                                },
                                                updateResult: {
                                                    type: "object",
                                                },
                                            },
                                        },
                                        details: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },

        "/api/admin/unblock/{id}": {
            patch: {
                tags: ["Admin"],
                summary: "Unblock one user by ID",
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: { type: "string" },
                    },
                ],
                responses: {
                    "200": {
                        description: "User is unblocked successfully",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        data: {
                                            $ref: "#/components/schemas/User",
                                        },
                                        details: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },

        "/api/admin/unblock": {
            patch: {
                tags: ["Admin"],
                summary: "Unblock multiple users",
                security: [{ bearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    ids: {
                                        type: "array",
                                        items: { type: "string" },
                                    },
                                },
                                required: ["ids"],
                            },
                        },
                    },
                },
                responses: {
                    "200": {
                        description: "Users are unblocked successfully",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        data: {
                                            type: "object",
                                            properties: {
                                                users: {
                                                    type: "array",
                                                    items: {
                                                        $ref: "#/components/schemas/User",
                                                    },
                                                },
                                                updateResult: {
                                                    type: "object",
                                                },
                                            },
                                        },
                                        details: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },

        "/api/admin/verify/{id}": {
            patch: {
                tags: ["Admin"],
                summary: "Verify one user by ID",
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: { type: "string" },
                    },
                ],
                responses: {
                    "200": {
                        description: "User is verified successfully",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        data: {
                                            $ref: "#/components/schemas/User",
                                        },
                                        details: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },

        "/api/admin/verify": {
            patch: {
                tags: ["Admin"],
                summary: "Verify multiple users",
                security: [{ bearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    ids: {
                                        type: "array",
                                        items: { type: "string" },
                                    },
                                },
                                required: ["ids"],
                            },
                        },
                    },
                },
                responses: {
                    "200": {
                        description: "Users are verified successfully",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        data: {
                                            type: "object",
                                            properties: {
                                                users: {
                                                    type: "array",
                                                    items: {
                                                        $ref: "#/components/schemas/User",
                                                    },
                                                },
                                                updateResult: {
                                                    type: "object",
                                                },
                                            },
                                        },
                                        details: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },

        "/api/admin/email/send-verification": {
            post: {
                tags: ["Admin"],
                summary: "Send verification email to user by ID",
                security: [{ bearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    id: {
                                        type: "string",
                                        example: "65f4a8b3c2e...",
                                    },
                                },
                                required: ["id"],
                            },
                        },
                    },
                },
                responses: {
                    "200": {
                        description: "Verification request sent successfully",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        data: { type: null },
                                        details: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },

        "/api/admin/{id}": {
            delete: {
                tags: ["Admin"],
                summary: "Delete one user by ID",
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: { type: "string" },
                    },
                ],
                responses: {
                    "200": {
                        description: "User is deleted successfully",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        data: { type: null },
                                        details: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },

        "/api/admin/bulk-delete": {
            post: {
                tags: ["Admin"],
                summary: "Delete multiple users",
                security: [{ bearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    ids: {
                                        type: "array",
                                        items: { type: "string" },
                                    },
                                },
                                required: ["ids"],
                            },
                        },
                    },
                },
                responses: {
                    "200": {
                        description: "Users are deleted successfully",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        data: { type: "object" },
                                        details: { type: "string" },
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
