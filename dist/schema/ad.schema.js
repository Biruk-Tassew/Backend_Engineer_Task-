"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adSchema = exports.updateAdSchema = exports.createAdSchema = void 0;
const zod_1 = require("zod");
/**
 * @openapi
 * components:
 *   schemas:
 *     CreateAdInput:
 *       type: object
 *       required:
 *         - title
 *         - description
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the ad.
 *         description:
 *           type: string
 *           description: The description of the ad.
 *       example:
 *         title: "Ad Title Example"
 *         description: "Ad Description Example"
 *     AdActionSuccessResponse:
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
 *             title:
 *               type: string
 *             description:
 *               type: string
 *             user:
 *               type: string
 *             attributes:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   key:
 *                     type: string
 *                   value:
 *                     type: string
 *             graphics:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   key:
 *                     type: string
 *                   value:
 *                     type: string
 *             _id:
 *               type: string
 *             createdAt:
 *               type: string
 *             updatedAt:
 *               type: string
 *       example:
 *         success: true
 *         message: "Ad created successfully"
 *         data:
 *           title: "Ad Title Example"
 *           description: "Ad Description Example"
 *           user: "User ID Example"
 *           attributes: []
 *           graphics: []
 *           _id: "Ad ID Example"
 *           createdAt: "2024-01-01T00:00:00.000Z"
 *           updatedAt: "2024-01-01T00:00:00.000Z"
 *     AdActionFailureResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: Indicates whether the request was successful.
 *         message:
 *           type: string
 *           description: Provides information about the failure.
 *         error:
 *           type: object
 *           nullable: true
 *           properties:
 *             message:
 *               type: string
 *             stack:
 *               type: string
 *               nullable: true
 *       example:
 *         success: false
 *         message: "Action failed"
 *         error:
 *           message: "Server error."
 *           stack: null
 *     UpdateAdInput:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the ad.
 *         description:
 *           type: string
 *           description: The description of the ad.
 *       example:
 *         title: "Updated Ad Title Example"
 *         description: "Updated Ad Description Example"
 *     UpdateAdResponse:
 *       oneOf:
 *         - $ref: '#/components/schemas/AdActionSuccessResponse'
 *         - $ref: '#/components/schemas/AdActionFailureResponse'
 */
exports.createAdSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        title: (0, zod_1.string)({
            required_error: "Title is required",
        }),
        description: (0, zod_1.string)({
            required_error: "Description is required",
        }),
        user: (0, zod_1.string)({
            required_error: "User ID is required",
        }),
    }),
});
exports.updateAdSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        title: (0, zod_1.string)().optional(),
        description: (0, zod_1.string)().optional(),
    }),
    params: (0, zod_1.object)({
        id: (0, zod_1.string)({
            required_error: "Ad ID is required",
        }),
    }),
});
exports.adSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        title: (0, zod_1.string)().nonempty("Title is required"),
        description: (0, zod_1.string)().nonempty("Description is required"),
        user: (0, zod_1.string)().nonempty("User ID is required"),
    }),
});
