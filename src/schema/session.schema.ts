import { object, string, TypeOf } from "zod";

/**
 * @openapi
 * components:
 *   schemas:
 *     GetSessionResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: Indicates whether the request was successful.
 *         message:
 *           type: string
 *           description: Provides information about the request.
 *         data:
 *           type: array
 *           items:
 *             type: object
 *             required:
 *               - user
 *               - valid
 *               - userAgent
 *               - createdAt
 *               - updatedAt
 *             properties:
 *               _id:
 *                 type: string
 *               user:
 *                 type: string
 *               valid:
 *                 type: boolean
 *               userAgent:
 *                 type: string
 *               createdAt:
 *                 type: string
 *                 format: date-time
 *               updatedAt:
 *                 type: string
 *                 format: date-time
 *               __v:
 *                 type: number
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
 *         200:
 *           value:
 *             success: true
 *             message: "Session fetched successfully"
 *             data:
 *               - _id: "Session ID Example"
 *                 user: "User ID Example"
 *                 valid: true
 *                 userAgent: "Mozilla/5.0"
 *                 createdAt: "2024-01-01T00:00:00.000Z"
 *                 updatedAt: "2024-01-01T00:00:00.000Z"
 *                 __v: 0
 *             error: null
 *         404:
 *           value:
 *             success: false
 *             message: "Session not found"
 *             error:
 *               message: "No session found with the provided ID"
 *               stack: null
 *         500:
 *           value:
 *             success: false
 *             message: "Internal server error"
 *             error:
 *               message: "An unexpected error occurred"
 *               stack: "Error stack trace example"
 *     CreateSessionInput:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           default: jane.doe@example.com
 *         password:
 *           type: string
 *           default: stringPassword123
 *       example:
 *         email: "jane.doe@example.com"
 *         password: "stringPassword123"
 *     CreateSessionResponse:
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
 *           required:
 *             - accessToken
 *             - refreshToken
 *           properties:
 *             accessToken:
 *               type: string
 *             refreshToken:
 *               type: string
 *           example:
 *             accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *             refreshToken: "d2VsY29tZWFuZG9nYXBwYWFhZWFhZWFhZWFh"
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
 *         200:
 *           value:
 *             success: true
 *             message: "Session created successfully"
 *             data:
 *               accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *               refreshToken: "d2VsY29tZWFuZG9nYXBwYWFhZWFhZWFhZWFh"
 *             error: null
 *         401:
 *           value:
 *             success: false
 *             message: "Invalid credentials"
 *             error:
 *               message: "The email or password is incorrect"
 *               stack: null
 *         500:
 *           value:
 *             success: false
 *             message: "Internal server error"
 *             error:
 *               message: "An unexpected error occurred"
 *               stack: "Error stack trace example"
 */

export const createSessionSchema = object({
  body: object({
    email: string({
      required_error: "Email is required",
    }),
    password: string({
      required_error: "Password is required",
    }),
  }),
});

export type CreateSessionInput = TypeOf<typeof createSessionSchema>;
