import { object, string, enum as zEnum, TypeOf } from "zod";

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

export const createUserSchema = object({
  body: object({
    name: string({
      required_error: "Name is required",
    }),
    password: string({
      required_error: "Password is required",
    }).min(6, "Password too short - should be 6 chars minimum"),
    passwordConfirmation: string({
      required_error: "passwordConfirmation is required",
    }),
    email: string({
      required_error: "Email is required",
    }).email("Not a valid email"),
    role: zEnum(["admin", "advertiser", "moderator", "analytics", "support"], {
      required_error: "Role is required",
    }).default("advertiser"),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  }),
});

export type CreateUserInput = Omit<
  TypeOf<typeof createUserSchema>,
  "body.passwordConfirmation"
>;
