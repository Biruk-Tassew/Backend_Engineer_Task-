import { object, string, TypeOf, number } from "zod";

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateAdGraphicInput:
 *      type: object
 *      required:
 *        - fileName
 *        - file
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
 *        error:
 *          type: object
 *          nullable: true
 *          properties:
 *            message:
 *              type: string
 *            stack:
 *              type: string
 *              nullable: true
 *    UpdateAdGraphicInput:
 *      type: object
 *      properties:
 *        fileName:
 *          type: string
 *          default: example.jpg
 *        adId:
 *          type: string
 *          description: The ID of the associated ad.
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

export const createAdGraphicSchema = object({
  body: object({
    fileName: string({
      required_error: "File name is required",
    }),
    adId: string({
      required_error: "Ad ID is required",
    }),
    videoCompressionLevel: string()
      .optional()
      .transform((val) => (val ? parseInt(val, 10) : undefined))
      .pipe(
        number()
          .min(0, "Compression level must be at least 0%")
          .max(100, "Compression level cannot exceed 100%")
      ),
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
