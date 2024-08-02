"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserSchema = void 0;
const zod_1 = require("zod");
/**
 * @openapi
 * components:
 *   schemas:
 *     CreateUserInput:
 *       type: object
 *       required:
 *         - email
 *         - name
 *         - password
 *         - passwordConfirmation
 *         - role
 *       properties:
 *         email:
 *           type: string
 *           default: jane.doe@example.com
 *         name:
 *           type: string
 *           default: Jane Doe
 *         password:
 *           type: string
 *           default: stringPassword123
 *         passwordConfirmation:
 *           type: string
 *           default: stringPassword123
 *         role:
 *           type: string
 *           enum: [admin, advertiser, moderator, analytics, support]
 *           default: advertiser
 *       example:
 *         email: "jane.doe@example.com"
 *         name: "Jane Doe"
 *         password: "stringPassword123"
 *         passwordConfirmation: "stringPassword123"
 *         role: "advertiser"
 *     CreateUserResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: Indicates whether the request was successful.
 *         message:
 *           type: string
 *           description: Provides information about the request.
 *         data:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *             name:
 *               type: string
 *             _id:
 *               type: string
 *             createdAt:
 *               type: string
 *               format: date-time
 *             updatedAt:
 *               type: string
 *               format: date-time
 *           example:
 *             email: "jane.doe@example.com"
 *             name: "Jane Doe"
 *             _id: "User ID Example"
 *             createdAt: "2024-01-01T00:00:00.000Z"
 *             updatedAt: "2024-01-01T00:00:00.000Z"
 *         error:
 *           type: object
 *           nullable: true
 *           properties:
 *             message:
 *               type: string
 *             stack:
 *               type: string
 *               nullable: true
 *       examples:
 *         201:
 *           value:
 *             success: true
 *             message: "User created successfully"
 *             data:
 *               email: "jane.doe@example.com"
 *               name: "Jane Doe"
 *               _id: "User ID Example"
 *               createdAt: "2024-01-01T00:00:00.000Z"
 *               updatedAt: "2024-01-01T00:00:00.000Z"
 *             error: null
 *         400:
 *           value:
 *             success: false
 *             message: "Invalid input"
 *             error:
 *               message: "Passwords do not match"
 *               stack: null
 *         500:
 *           value:
 *             success: false
 *             message: "Internal server error"
 *             error:
 *               message: "An unexpected error occurred"
 *               stack: "Error stack trace example"
 */
exports.createUserSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        name: (0, zod_1.string)({
            required_error: "Name is required",
        }),
        password: (0, zod_1.string)({
            required_error: "Password is required",
        }).min(6, "Password too short - should be 6 chars minimum"),
        passwordConfirmation: (0, zod_1.string)({
            required_error: "Password confirmation is required",
        }),
        email: (0, zod_1.string)({
            required_error: "Email is required",
        }).email("Not a valid email"),
        role: (0, zod_1.enum)(["admin", "advertiser", "moderator", "analytics", "support"], {
            required_error: "Role is required",
        }).default("advertiser"),
    }).refine((data) => data.password === data.passwordConfirmation, {
        message: "Passwords do not match",
        path: ["passwordConfirmation"],
    }),
});
