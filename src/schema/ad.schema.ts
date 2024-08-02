import { object, string, TypeOf } from "zod";

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateAdInput:
 *      type: object
 *      required:
 *        - title
 *        - description
 *      properties:
 *        title:
 *          type: string
 *          description: The title of the ad.
 *        description:
 *          type: string
 *          description: The description of the ad.
 *    CreateAdResponse:
 *      type: object
 *      properties:
 *        success:
 *          type: boolean
 *          description: Indicates whether the request was successful.
 *        message:
 *          type: string
 *          description: Provides information about the request.
 *        data:
 *          type: object
 *          properties:
 *            title:
 *              type: string
 *            description:
 *              type: string
 *            user:
 *              type: string
 *            attributes:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  key:
 *                    type: string
 *                  value:
 *                    type: string
 *            _id:
 *              type: string
 *            createdAt:
 *              type: string
 *            updatedAt:
 *              type: string
 *        error:
 *          type: object
 *          nullable: true
 *          properties:
 *            message:
 *              type: string
 *            stack:
 *              type: string
 *              nullable: true
 *    UpdateAdInput:
 *      type: object
 *      properties:
 *        title:
 *          type: string
 *          description: The title of the ad.
 *        description:
 *          type: string
 *          description: The description of the ad.
 *    UpdateAdResponse:
 *      type: object
 *      properties:
 *        success:
 *          type: boolean
 *          description: Indicates whether the request was successful.
 *        message:
 *          type: string
 *          description: Provides information about the request.
 *        data:
 *          type: object
 *          properties:
 *            title:
 *              type: string
 *            description:
 *              type: string
 *            user:
 *              type: string
 *            attributes:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  key:
 *                    type: string
 *                  value:
 *                    type: string
 *            _id:
 *              type: string
 *            createdAt:
 *              type: string
 *            updatedAt:
 *              type: string
 *        error:
 *          type: object
 *          nullable: true
 *          properties:
 *            message:
 *              type: string
 *            stack:
 *              type: string
 *              nullable: true
 */

export const createAdSchema = object({
  body: object({
    title: string({
      required_error: "Title is required",
    }),
    description: string({
      required_error: "Description is required",
    }),
    user: string({
      required_error: "User ID is required",
    }),
  }),
});

export type CreateAdInput = TypeOf<typeof createAdSchema>;

export const updateAdSchema = object({
  body: object({
    title: string().optional(),
    description: string().optional(),
  }),
  params: object({
    id: string({
      required_error: "Ad ID is required",
    }),
  }),
});

export type UpdateAdInput = TypeOf<typeof updateAdSchema>;

export const adSchema = object({
  body: object({
    title: string().nonempty("Title is required"),
    description: string().nonempty("Description is required"),
    user: string().nonempty("User ID is required"),
  }),
});

export type AdInput = TypeOf<typeof adSchema>;
