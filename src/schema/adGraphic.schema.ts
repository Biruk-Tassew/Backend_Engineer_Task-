import { object, string, TypeOf, number } from "zod";

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateAdGraphicInput:
 *      type: object
 *      required:
 *        - file
 *      properties:
 *        file:
 *          type: string
 *          format: binary
 *          description: The image or video file to be uploaded.
 *    CreateAdGraphicResponse:
 *      type: object
 *      properties:
 *        fileName:
 *          type: string
 *        fileType:
 *          type: string
 *        fileSize:
 *          type: integer
 *        fileUrl:
 *          type: string
 *        _id:
 *          type: string
 *        user:
 *          type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 *    UpdateAdGraphicInput:
 *      type: object
 *      properties:
 *        fileName:
 *          type: string
 *          default: example.jpg
 *        fileType:
 *          type: string
 *          default: image/jpeg
 *        fileSize:
 *          type: integer
 *          default: 102400
 *        fileUrl:
 *          type: string
 *          default: http://example.com/example.jpg
 *        uploadDate:
 *          type: string
 *          format: date-time
 *        id:
 *          type: string
 *          required: true
 */

export const createAdGraphicSchema = object({
  // No body fields are validated here since only a file is expected
});

export type CreateAdGraphicInput = TypeOf<typeof createAdGraphicSchema>;

export const updateAdGraphicSchema = object({
  body: object({
    fileName: string().optional(),
    fileType: string().regex(/^.+\/.+$/, "Invalid file type format").optional(),
    fileSize: number().int("File size must be an integer").optional(),
    fileUrl: string().url("Invalid URL format").optional(),
    uploadDate: string().datetime({ offset: true }).optional(),
  }),
  params: object({
    id: string({
      required_error: "AdGraphic ID is required",
    }),
  }),
});

export type UpdateAdGraphicInput = TypeOf<typeof updateAdGraphicSchema>;
