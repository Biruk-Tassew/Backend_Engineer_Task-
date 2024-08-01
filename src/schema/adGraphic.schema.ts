import { object, string, TypeOf, number, date } from "zod";

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
 *        - adId
 *        - userId
 *      properties:
 *        fileName:
 *          type: string
 *          description: The name of the file.
 *        fileType:
 *          type: string
 *          description: The type of the file, such as image/jpeg or video/mp4.
 *        fileSize:
 *          type: integer
 *          description: The size of the file in bytes.
 *        fileUrl:
 *          type: string
 *          description: The URL where the file is accessible.
 *        adId:
 *          type: string
 *          description: The ID of the associated ad.
 *        userId:
 *          type: string
 *          description: The ID of the user who uploaded the file.
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
 *        userId:
 *          type: string
 *        adId:
 *          type: string
 *        uploadDate:
 *          type: string
 *          format: date-time
 *        createdAt:
 *          type: string
 *          format: date-time
 *        updatedAt:
 *          type: string
 *          format: date-time
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
  body: object({
    fileName: string({
      required_error: "File name is required",
    }),
    fileType: string({
      required_error: "File type is required",
    }),
    fileSize: number({
      required_error: "File size is required",
    }),
    fileUrl: string({
      required_error: "File URL is required",
    }).url("Invalid URL format"),
    adId: string({
      required_error: "Ad ID is required",
    }),
    userId: string({
      required_error: "User ID is required",
    }),
  }),
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
