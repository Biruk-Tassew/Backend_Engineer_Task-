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
 *      example:
 *        adId: "Ad ID Example"
 *        key: "gender"
 *        value: "male"
 *    CreateAdAttributeResponse:
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
 *            adId:
 *              type: string
 *            key:
 *              type: string
 *            value:
 *              type: string
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
 *      example:
 *        success: true
 *        message: "Action performed successfully"
 *        data:
 *          adId: "Ad ID Example"
 *          key: "gender"
 *          value: "male"
 *          _id: "AdAttribute ID Example"
 *          createdAt: "2024-01-01T00:00:00.000Z"
 *          updatedAt: "2024-01-01T00:00:00.000Z"
 *    AdActionFailureResponse:
 *      type: object
 *      properties:
 *        success:
 *          type: boolean
 *          description: Indicates whether the request was successful.
 *        message:
 *          type: string
 *          description: Provides information about the failure.
 *        error:
 *          type: object
 *          nullable: true
 *          properties:
 *            message:
 *              type: string
 *            stack:
 *              type: string
 *              nullable: true
 *      examples:
 *        404:
 *          value:
 *            success: false
 *            message: "Ad attribute not found"
 *            error:
 *              message: "No ad attribute found with the provided ID"
 *              stack: null
 *        403:
 *          value:
 *            success: false
 *            message: "Forbidden"
 *            error:
 *              message: "You do not have permission to perform this action"
 *              stack: null
 *        500:
 *          value:
 *            success: false
 *            message: "Internal server error"
 *            error:
 *              message: "An unexpected error occurred"
 *              stack: "Error stack trace example"
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
 *      example:
 *        adId: "Ad ID Example"
 *        key: "location"
 *        value: "New York"
 *    UpdateAdAttributeResponse:
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
 *            adId:
 *              type: string
 *            key:
 *              type: string
 *            value:
 *              type: string
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
 *      example:
 *        success: true
 *        message: "Ad attribute updated successfully"
 *        data:
 *          adId: "Ad ID Example"
 *          key: "location"
 *          value: "New York"
 *          _id: "Updated AdAttribute ID Example"
 *          createdAt: "2024-01-01T00:00:00.000Z"
 *          updatedAt: "2024-01-01T00:00:00.000Z"
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
