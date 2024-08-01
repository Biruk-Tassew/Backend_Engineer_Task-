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
 *        file:
 *          type: string
 *          format: binary
 *          description: The image or video file to be uploaded.
 *        fileName:
 *          type: string
 *        _id:
 *          type: string
 *        adId:
 *          type: string
 *    UpdateAdGraphicInput:
 *      type: object
 *      properties:
 *        fileName:
 *          type: string
 *          default: example.jpg
 *        adId:
 *          type: string
 *          description: The ID of the associated ad.
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
