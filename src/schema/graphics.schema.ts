import { object, string, number, date, TypeOf } from "zod";

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateAdGraphicInput:
 *      type: object
 *      required:
 *        - fileName
 *        - fileType
 *        - fileSize
 *        - fileUrl
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
 *          default: 2024-07-30T00:00:00Z
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
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 */

export const createAdGraphicSchema = object({
  body: object({
    fileName: string({
      required_error: "File name is required",
    }),
    fileType: string({
      required_error: "File type is required",
    }).regex(/^.+\/.+$/, "Invalid file type format"),
    fileSize: number({
      required_error: "File size is required",
    }).int("File size must be an integer"),
    fileUrl: string({
      required_error: "File URL is required",
    }).url("Invalid URL format"),
    uploadDate: date({
      required_error: "Upload date is required",
    }).default(new Date()), 
  }),
});

export type CreateAdGraphicInput = TypeOf<typeof createAdGraphicSchema>;
