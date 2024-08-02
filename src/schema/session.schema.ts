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
 *         error:
 *           type: object
 *           nullable: true
 *           properties:
 *             message:
 *               type: string
 *             stack:
 *               type: string
 *               nullable: true
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
