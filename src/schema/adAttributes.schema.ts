import { object, string, TypeOf } from "zod";

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateAdAttributeInput:
 *      type: object
 *      required:
 *        - adId
 *        - key
 *        - value
 *      properties:
 *        adId:
 *          type: string
 *          description: The ID of the associated ad.
 *        key:
 *          type: string
 *          description: The attribute key (e.g., gender, location).
 *        value:
 *          type: string
 *          description: The attribute value.
 *    CreateAdAttributeResponse:
 *      type: object
 *      properties:
 *        adId:
 *          type: string
 *        key:
 *          type: string
 *        value:
 *          type: string
 *        _id:
 *          type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 *    UpdateAdAttributeInput:
 *      type: object
 *      properties:
 *        adId:
 *          type: string
 *          description: The ID of the associated ad.
 *        key:
 *          type: string
 *          description: The attribute key (e.g., gender, location).
 *        value:
 *          type: string
 *          description: The attribute value.
 */

export const createAdAttributeSchema = object({
  body: object({
    adId: string({
      required_error: "Ad ID is required",
    }),
    key: string({
      required_error: "Key is required",
    }),
    value: string({
      required_error: "Value is required",
    }),
  }),
});

export type CreateAdAttributeInput = TypeOf<typeof createAdAttributeSchema>;

export const updateAdAttributeSchema = object({
  body: object({
    adId: string({
      required_error: "Ad ID is required",
    }),
    key: string({
      required_error: "Key is required",
    }),
    value: string({
      required_error: "Value is required",
    }),
  }),
  params: object({
    id: string({
      required_error: "Ad Attribute ID is required",
    }),
  }),
});

export type UpdateAdAttributeInput = TypeOf<typeof updateAdAttributeSchema>;
