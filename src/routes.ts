import { Express, Request, Response } from "express";
import {
  createProductHandler,
  getProductHandler,
  updateProductHandler,
  deleteProductHandler,
} from "./controller/product.controller";
import {
  createUserSessionHandler,
  getUserSessionsHandler,
  deleteSessionHandler,
} from "./controller/session.controller";
import { createUserHandler } from "./controller/user.controller";
import requireUser from "./middleware/requireUser";
import validateResource from "./middleware/validateResource";
import {
  createProductSchema,
  deleteProductSchema,
  getProductSchema,
  updateProductSchema,
} from "./schema/product.schema";
import { createSessionSchema } from "./schema/session.schema";
import { createUserSchema } from "./schema/user.schema";
import { createAdGraphicHandler, deleteAdGraphicHandler, getAdGraphicHandler, updateAdGraphicHandler } from "./controller/adGraphic.controller";
import { createAdGraphicSchema, updateAdGraphicSchema } from "./schema/adGraphic.schema";
import { validateFilePresence } from "./middleware/validateFilePresence";
import upload from "./middleware/upload.middleware";
import { createAdHandler, deleteAdHandler, getAdHandler, getAllAdsHandler, updateAdHandler } from "./controller/ad.controller";
import { createAdAttributeHandler, deleteAdAttributeHandler, getAdAttributeByAdHandler, getAdAttributeHandler, updateAdAttributeHandler } from "./controller/adAttributes.controller";
import authorize from "./middleware/authorization.middleware";

function routes(app: Express) {
  /**
   * @openapi
   * /healthcheck:
   *  get:
   *     tags:
   *     - Healthcheck
   *     description: Responds if the app is up and running
   *     responses:
   *       200:
   *         description: App is up and running
   */
  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

  /**
  * @openapi
  * '/api/ad-graphics':
  *  post:
  *     tags:
  *     - AdGraphic
  *     summary: Upload new ad graphics (images or videos)
  *     requestBody:
  *       required: true
  *       content:
  *         multipart/form-data:
  *           schema:
  *             $ref: '#/components/schemas/CreateAdGraphicInput'
  *     responses:
  *       200:
  *         description: Ad graphics uploaded successfully
  *         content:
  *          application/json:
  *           schema:
  *              $ref: '#/components/schemas/AdGraphicSchema'
  */
  app.post(
    "/api/ad-graphics",
    [requireUser, authorize("AdGraphics", "create"), upload.single('file'), validateResource(createAdGraphicSchema)],
    createAdGraphicHandler
  );

  /**
   * @openapi
   * '/api/ad-graphics/{id}':
   *  get:
   *     tags:
   *     - AdGraphic
   *     summary: Get ad graphics by ID
   *     parameters:
   *      - name: id
   *        in: path
   *        description: The ID of the ad graphics
   *        required: true
   *     responses:
   *       200:
   *         description: Ad graphics retrieved successfully
   *         content:
   *          application/json:
   *           schema:
   *              $ref: '#/components/schemas/AdGraphicSchema'
   *       404:
   *         description: Ad graphics not found
   */
  app.get(
    "/api/ad-graphics/:id",
    [requireUser, authorize("User", "read")],
    validateResource(createAdGraphicSchema),
    getAdGraphicHandler
  );

  /**
   * @openapi
   * '/api/ad-graphics/{id}':
   *  put:
   *     tags:
   *     - AdGraphic
   *     summary: Update ad graphics by ID
   *     parameters:
   *      - name: id
   *        in: path
   *        description: The ID of the ad graphics
   *        required: true
   *     requestBody:
   *       required: true
   *       content:
   *         multipart/form-data:
   *           schema:
   *             $ref: '#/components/schemas/UpdateAdGraphicInput'
   *     responses:
   *       200:
   *         description: Ad graphics updated successfully
   *         content:
   *          application/json:
   *           schema:
   *              $ref: '#/components/schemas/AdGraphicSchema'
   *       404:
   *         description: Ad graphics not found
   */
  app.put(
    "/api/ad-graphics/:id",
    [requireUser, authorize("User", "update"), upload.single('file'), validateResource(updateAdGraphicSchema)],
    updateAdGraphicHandler
  );

  /**
   * @openapi
   * '/api/ad-graphics/{id}':
   *  delete:
   *     tags:
   *     - AdGraphic
   *     summary: Delete ad graphics by ID
   *     parameters:
   *      - name: id
   *        in: path
   *        description: The ID of the ad graphics
   *        required: true
   *     responses:
   *       200:
   *         description: Ad graphics deleted successfully
   *       404:
   *         description: Ad graphics not found
   */
  app.delete(
    "/api/ad-graphics/:id",
    [requireUser, authorize("User", "delete"), validateResource(createAdGraphicSchema)],
    deleteAdGraphicHandler
  );


  /**
   * @openapi
   * '/api/users':
   *  post:
   *     tags:
   *     - User
   *     summary: Register a user
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/CreateUserInput'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/CreateUserResponse'
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   */
  app.post("/api/users", validateResource(createUserSchema), createUserHandler);

  /**
   * @openapi
   * '/api/sessions':
   *  get:
   *    tags:
   *    - Session
   *    summary: Get all sessions
   *    responses:
   *      200:
   *        description: Get all sessions for current user
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/GetSessionResponse'
   *      403:
   *        description: Forbidden
   *  post:
   *    tags:
   *    - Session
   *    summary: Create a session
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            $ref: '#/components/schemas/CreateSessionInput'
   *    responses:
   *      200:
   *        description: Session created
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/CreateSessionResponse'
   *      401:
   *        description: Unauthorized
   *  delete:
   *    tags:
   *    - Session
   *    summary: Delete a session
   *    responses:
   *      200:
   *        description: Session deleted
   *      403:
   *        description: Forbidden
   */
  app.post(
    "/api/sessions",
    validateResource(createSessionSchema),
    createUserSessionHandler
  );

  app.get("/api/sessions", requireUser, getUserSessionsHandler);

  app.delete("/api/sessions", requireUser, deleteSessionHandler);

  /**
   * @openapi
   * /api/ads:
   *   post:
   *     summary: Create a new ad
   *     tags: [Ads]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateAdInput'
   *     responses:
   *       201:
   *         description: Ad created successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Ad'
   *       500:
   *         description: Internal server error
   */
  app.post("/api/ads", [requireUser, authorize("Ad", "create")], createAdHandler);

  /**
   * @openapi
   * /api/ads/{id}:
   *   put:
   *     summary: Update an existing ad
   *     tags: [Ads]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         description: Ad ID
   *         schema:
   *           type: string
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UpdateAdInput'
   *     responses:
   *       200:
   *         description: Ad updated successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Ad'
   *       403:
   *         description: Forbidden - User not authorized to update this ad
   *       404:
   *         description: Ad not found
   *       500:
   *         description: Internal server error
   */
  app.put("/api/ads/:id", [requireUser, authorize("Ad", "update")], updateAdHandler);

  /**
  * @openapi
  * /ads:
  *   get:
  *     summary: Get all ads
  *     tags: [Ads]
  *     description: Retrieve a list of all ads
  *     responses:
  *       200:
  *         description: A list of ads
  *         content:
  *           application/json:
  *             schema:
  *               type: array
  *               items:
  *                 $ref: '#/components/schemas/Ad'
  *       500:
  *         description: Internal server error
  */
  app.get("/ads", getAllAdsHandler);

  /**
   * @openapi
   * /api/ads/{id}:
   *   get:
   *     summary: Get a specific ad by ID
   *     tags: [Ads]
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         description: Ad ID
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Ad details
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Ad'
   *       404:
   *         description: Ad not found
   *       500:
   *         description: Internal server error
   */
  app.get("/api/ads/:id", getAdHandler);

  /**
   * @openapi
   * /api/ads/{id}:
   *   delete:
   *     summary: Delete a specific ad by ID
   *     tags: [Ads]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         description: Ad ID
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Ad deleted successfully
   *       403:
   *         description: Forbidden - User not authorized to delete this ad
   *       404:
   *         description: Ad not found
   *       500:
   *         description: Internal server error
   */
  app.delete("/api/ads/:id", [requireUser, authorize("Ad", "delete")], deleteAdHandler);

  /**
   * @openapi
   * /api/ad-attributes:
   *   post:
   *     summary: Create a new ad attribute
   *     tags: [Ad Attributes]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateAdAttributeInput'
   *     responses:
   *       201:
   *         description: Ad attribute created successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/AdAttribute'
   *       500:
   *         description: Internal server error
   */
  app.post("/api/ad-attributes", [requireUser, authorize("AdAttribute", "create")], createAdAttributeHandler);

  /**
   * @openapi
   * /api/ad-attributes/{id}:
   *   put:
   *     summary: Update an existing ad attribute
   *     tags: [Ad Attributes]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         description: Ad attribute ID
   *         schema:
   *           type: string
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UpdateAdAttributeInput'
   *     responses:
   *       200:
   *         description: Ad attribute updated successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/AdAttribute'
   *       404:
   *         description: Ad attribute not found
   *       500:
   *         description: Internal server error
   */
  app.put("/api/ad-attributes/:id", [requireUser, authorize("AdAttribute", "update")], updateAdAttributeHandler);

  /**
   * @openapi
   * /api/ad-attributes/{id}:
   *   get:
   *     summary: Get a specific ad attribute by ID
   *     tags: [Ad Attributes]
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         description: Ad attribute ID
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Ad attribute details
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/AdAttribute'
   *       404:
   *         description: Ad attribute not found
   *       500:
   *         description: Internal server error
   */
  app.get("/api/ad-attributes/:id", getAdAttributeHandler);

  /**
 * @openapi
 * /api/ad-attributes/by-ad/{adId}:
 *   get:
 *     summary: Get ad attributes by ad ID
 *     tags: [Ad Attributes]
 *     parameters:
 *       - name: adId
 *         in: path
 *         required: true
 *         description: Ad ID to retrieve attributes for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of ad attributes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AdAttribute'
 *       404:
 *         description: No ad attributes found for the given ad ID
 *       500:
 *         description: Internal server error
 */
  app.get("/api/ad-attributes/by-ad/:id", getAdAttributeByAdHandler);

  /**
   * @openapi
   * /api/ad-attributes/{id}:
   *   delete:
   *     summary: Delete a specific ad attribute by ID
   *     tags: [Ad Attributes]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         description: Ad attribute ID
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Ad attribute deleted successfully
   *       404:
   *         description: Ad attribute not found
   *       500:
   *         description: Internal server error
   */
  app.delete("/api/ad-attributes/:id", [requireUser, authorize("AdAttribute", "delete")], deleteAdAttributeHandler);
}

export default routes;
