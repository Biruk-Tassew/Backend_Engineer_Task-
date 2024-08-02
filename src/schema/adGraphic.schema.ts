import { object, string, number, TypeOf } from "zod";

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateAdGraphicInput:
 *      type: object
 *      required:
 *        - file
 *        - fileName
 *        - adId
 *      properties:
 *        file:
 *          type: string
 *          format: binary
 *          description: The image or video file to be uploaded.
 *        fileName:
 *          type: string
 *          description: The name of the file.
 *        adId:
 *          type: string
 *          description: The ID of the associated ad.
 *        videoCompressionLevel:
 *          type: number
 *          description: The compression level for the video in percentage (optional).
 *      example:
 *        file: "file data here"
 *        fileName: "example.jpg"
 *        adId: "Ad ID Example"
 *        videoCompressionLevel: 50
 *    CreateAdGraphicResponse:
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
 *            file:
 *              type: string
 *              format: binary
 *              description: The uploaded image or video file.
 *            fileName:
 *              type: string
 *              description: The name of the file.
 *            _id:
 *              type: string
 *              description: The ID of the created ad graphic.
 *            adId:
 *              type: string
 *              description: The ID of the associated ad.
 *            createdAt:
 *              type: string
 *              format: date-time
 *              description: The date and time when the ad graphic was created.
 *            updatedAt:
 *              type: string
 *              format: date-time
 *              description: The date and time when the ad graphic was last updated.
 *      example:
 *        success: true
 *        message: "Ad graphic created successfully"
 *        data:
 *          file: "file data here"
 *          fileName: "example.jpg"
 *          _id: "AdGraphic ID Example"
 *          adId: "Ad ID Example"
 *          createdAt: "2024-01-01T00:00:00.000Z"
 *          updatedAt: "2024-01-01T00:00:00.000Z"
 *    AdGraphicsActionFailureResponse:
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
 *            message: "Ad graphic not found"
 *            error:
 *              message: "No ad graphic found with the provided ID"
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
 *    UpdateAdGraphicInput:
 *      type: object
 *      properties:
 *        fileName:
 *          type: string
 *          description: The name of the file.
 *        adId:
 *          type: string
 *          description: The ID of the associated ad.
 *      example:
 *        fileName: "updated_example.jpg"
 *        adId: "Ad ID Example"
 *    UpdateAdGraphicResponse:
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
 *            fileName:
 *              type: string
 *              description: The updated file name.
 *            adId:
 *              type: string
 *              description: The ID of the associated ad.
 *            _id:
 *              type: string
 *              description: The ID of the updated ad graphic.
 *            createdAt:
 *              type: string
 *              format: date-time
 *              description: The date and time when the ad graphic was created.
 *            updatedAt:
 *              type: string
 *              format: date-time
 *              description: The date and time when the ad graphic was last updated.
 *      example:
 *        success: true
 *        message: "Ad graphic updated successfully"
 *        data:
 *          fileName: "updated_example.jpg"
 *          adId: "Ad ID Example"
 *          _id: "Updated AdGraphic ID Example"
 *          createdAt: "2024-01-01T00:00:00.000Z"
 *          updatedAt: "2024-01-01T00:00:00.000Z"
 */

export const createAdGraphicSchema = object({
  body: object({
    file: string({
      required_error: "File is required",
    }),
    fileName: string({
      required_error: "File name is required",
    }),
    adId: string({
      required_error: "Ad ID is required",
    }),
    videoCompressionLevel: number()
      .min(0, "Compression level must be at least 0%")
      .max(100, "Compression level cannot exceed 100%")
      .optional(),
  }),
});

export type CreateAdGraphicInput = TypeOf<typeof createAdGraphicSchema>;

export const updateAdGraphicSchema = object({
  body: object({
    fileName: string({
      required_error: "File name is required",
    }),
    adId: string({
      required_error: "Ad ID is required",
    }),
  }),
  params: object({
    id: string({
      required_error: "AdGraphic ID is required",
    }),
  }),
});

export type UpdateAdGraphicInput = TypeOf<typeof updateAdGraphicSchema>;
