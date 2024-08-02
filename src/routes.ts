import { Express, Request, Response } from "express";
import {
  createUserSessionHandler,
  getUserSessionsHandler,
  deleteSessionHandler,
} from "./controller/session.controller";
import { createUserHandler } from "./controller/user.controller";
import requireUser from "./middleware/requireUser";
import validateResource from "./middleware/validateResource";
import { createSessionSchema } from "./schema/session.schema";
import { createUserSchema } from "./schema/user.schema";
import { createAdGraphicHandler, deleteAdGraphicHandler, getAdGraphicHandler, updateAdGraphicHandler } from "./controller/adGraphic.controller";
import { createAdGraphicSchema, updateAdGraphicSchema } from "./schema/adGraphic.schema";
import { validateFilePresence } from "./middleware/validateFilePresence";
import upload from "./middleware/upload.middleware";
import { createAdHandler, deleteAdHandler, getAdHandler, getAllAdsHandler, updateAdHandler } from "./controller/ad.controller";
import { createAdAttributeHandler, deleteAdAttributeHandler, getAdAttributeByAdHandler, getAdAttributeHandler, updateAdAttributeHandler } from "./controller/adAttributes.controller";
import authorize from "./middleware/authorization.middleware";
import { checkEmailNotUsed } from "./middleware/userValidation.middleware";

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
   * /api/ad-graphics:
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
   *       500:
   *         description: Internal server error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/AdActionFailureResponse'
   */
  app.post(
    "/api/ad-graphics",
    [requireUser, authorize("AdGraphics", "create"), upload.single('file'), validateResource(createAdGraphicSchema)],
    createAdGraphicHandler
  );

  /**
   * @openapi
   * /api/ad-graphics/{id}:
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
   *       500:
   *         description: Internal server error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/AdActionFailureResponse'
   */
  app.get(
    "/api/ad-graphics/:id",
    [requireUser, authorize("User", "read")],
    validateResource(createAdGraphicSchema),
    getAdGraphicHandler
  );

  /**
   * @openapi
   * /api/ad-graphics/{id}:
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
   *       500:
   *         description: Internal server error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/AdActionFailureResponse'
   */
  app.put(
    "/api/ad-graphics/:id",
    [requireUser, authorize("User", "update"), upload.single('file'), validateResource(updateAdGraphicSchema)],
    updateAdGraphicHandler
  );

  /**
   * @openapi
   * /api/ad-graphics/{id}:
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
   *       500:
   *         description: Internal server error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/AdActionFailureResponse'
   */
  app.delete(
    "/api/ad-graphics/:id",
    [requireUser, authorize("User", "delete"), validateResource(createAdGraphicSchema)],
    deleteAdGraphicHandler
  );


  /**
   * @openapi
   * /api/users:
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
   *      500:
   *        description: Internal server error
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/AdActionFailureResponse'
   */
  app.post("/api/users", [checkEmailNotUsed, validateResource(createUserSchema)], createUserHandler);

  /**
   * @openapi
   * /api/sessions:
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
   *      500:
   *        description: Internal server error
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/AdActionFailureResponse'
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
   *      500:
   *        description: Internal server error
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/AdActionFailureResponse'
   *  delete:
   *    tags:
   *    - Session
   *    summary: Delete a session
   *    responses:
   *      200:
   *        description: Session deleted
   *      403:
   *        description: Forbidden
   *      500:
   *        description: Internal server error
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/AdActionFailureResponse'
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
   *  post:
   *    summary: Create a new ad
   *    tags:
   *      - Ads
   *    security:
   *      - bearerAuth: []
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            $ref: '#/components/schemas/CreateAdInput'
   *    responses:
   *      200:
   *        description: Ad created successfully
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/AdActionSuccessResponse'
   *      500:
   *        description: Internal server error
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/AdActionFailureResponse'
   */
  app.post("/api/ads", [requireUser, authorize("Ad", "create")], createAdHandler);

  /**
   * @openapi
   * /api/ads/{id}:
   *  put:
   *    summary: Update an existing ad
   *    tags:
   *      - Ads
   *    security:
   *      - bearerAuth: []
   *    parameters:
   *      - name: id
   *        in: path
   *        required: true
   *        description: The ID of the ad
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            $ref: '#/components/schemas/UpdateAdInput'
   *    responses:
   *      200:
   *        description: Ad updated successfully
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/AdActionSuccessResponse'
   *      404:
   *        description: Ad not found
   *      500:
   *        description: Internal server error
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/AdActionFailureResponse'
   */
  app.put(
    "/api/ads/:id",
    [requireUser, authorize("Ad", "update")],
    updateAdHandler
  );

  /**
   * @openapi
   * /api/ads/{id}:
   *  delete:
   *    summary: Delete an existing ad
   *    tags:
   *      - Ads
   *    security:
   *      - bearerAuth: []
   *    parameters:
   *      - name: id
   *        in: path
   *        required: true
   *        description: The ID of the ad
   *    responses:
   *      200:
   *        description: Ad deleted successfully
   *      404:
   *        description: Ad not found
   *      500:
   *        description: Internal server error
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/AdActionFailureResponse'
   */
  app.delete(
    "/api/ads/:id",
    [requireUser, authorize("Ad", "delete")],
    deleteAdHandler
  );

  /**
   * @openapi
   * /api/ads/{id}:
   *  get:
   *    summary: Get a specific ad by ID
   *    tags:
   *      - Ads
   *    security:
   *      - bearerAuth: []
   *    parameters:
   *      - name: id
   *        in: path
   *        required: true
   *        description: The ID of the ad
   *    responses:
   *      200:
   *        description: Ad retrieved successfully
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/AdActionSuccessResponse'
   *      404:
   *        description: Ad not found
   *      500:
   *        description: Internal server error
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/AdActionFailureResponse'
   */
  app.get(
    "/api/ads/:id",
    [requireUser, authorize("Ad", "read")],
    getAdHandler
  );

  /**
   * @openapi
   * /api/ads:
   *  get:
   *    summary: Get all ads
   *    tags:
   *      - Ads
   *    security:
   *      - bearerAuth: []
   *    responses:
   *      200:
   *        description: List of ads
   *        content:
   *          application/json:
   *            schema:
   *              type: array
   *              items:
   *                $ref: '#/components/schemas/AdActionSuccessResponse'
   *      500:
   *        description: Internal server error
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/AdActionFailureResponse'
   */
  app.get(
    "/api/ads",
    [requireUser, authorize("Ad", "read")],
    getAllAdsHandler
  );

  /**
   * @openapi
   * /api/ad-attributes:
   *  post:
   *    summary: Create a new ad attribute
   *    tags:
   *      - AdAttributes
   *    security:
   *      - bearerAuth: []
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            $ref: '#/components/schemas/CreateAdAttributeInput'
   *    responses:
   *      201:
   *        description: Ad attribute created successfully
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/CreateAdAttributeResponse'
   *      500:
   *        description: Internal server error
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/AdActionFailureResponse'
   */
  app.post(
    "/api/ad-attributes",
    [requireUser, authorize("AdAttributes", "create")],
    createAdAttributeHandler
  );

  /**
   * @openapi
   * /api/ad-attributes/{id}:
   *  put:
   *    summary: Update an ad attribute
   *    tags:
   *      - AdAttributes
   *    security:
   *      - bearerAuth: []
   *    parameters:
   *      - name: id
   *        in: path
   *        required: true
   *        description: The ID of the ad attribute
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            $ref: '#/components/schemas/UpdateAdAttributeInput'
   *    responses:
   *      200:
   *        description: Ad attribute updated successfully
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/CreateAdAttributeResponse'
   *      404:
   *        description: Ad attribute not found
   *      500:
   *        description: Internal server error
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/AdActionFailureResponse'
   */
  app.put(
    "/api/ad-attributes/:id",
    [requireUser, authorize("AdAttributes", "update")],
    updateAdAttributeHandler
  );

  /**
   * @openapi
   * /api/ad-attributes/{id}:
   *  delete:
   *    summary: Delete an ad attribute
   *    tags:
   *      - AdAttributes
   *    security:
   *      - bearerAuth: []
   *    parameters:
   *      - name: id
   *        in: path
   *        required: true
   *        description: The ID of the ad attribute
   *    responses:
   *      200:
   *        description: Ad attribute deleted successfully
   *      404:
   *        description: Ad attribute not found
   *      500:
   *        description: Internal server error
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/AdActionFailureResponse'
   */
  app.delete(
    "/api/ad-attributes/:id",
    [requireUser, authorize("AdAttributes", "delete")],
    deleteAdAttributeHandler
  );

  /**
   * @openapi
   * /api/ad-attributes/{adId}:
   *  get:
   *    summary: Get all attributes for a specific ad
   *    tags:
   *      - AdAttributes
   *    security:
   *      - bearerAuth: []
   *    parameters:
   *      - name: adId
   *        in: path
   *        required: true
   *        description: The ID of the ad
   *    responses:
   *      200:
   *        description: List of ad attributes
   *        content:
   *          application/json:
   *            schema:
   *              type: array
   *              items:
   *                $ref: '#/components/schemas/CreateAdAttributeResponse'
   *      404:
   *        description: Ad attributes not found
   *      500:
   *        description: Internal server error
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/AdActionFailureResponse'
   */
  app.get(
    "/api/ad-attributes/ad/:adId",
    [requireUser, authorize("AdAttributes", "read")],
    getAdAttributeByAdHandler
  );

  /**
   * @openapi
   * /api/ad-attributes:
   *  get:
   *    summary: Get all ad attributes
   *    tags:
   *      - AdAttributes
   *    security:
   *      - bearerAuth: []
   *    responses:
   *      200:
   *        description: List of ad attributes
   *        content:
   *          application/json:
   *            schema:
   *              type: array
   *              items:
   *                $ref: '#/components/schemas/CreateAdAttributeResponse'
   *      500:
   *        description: Internal server error
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/AdActionFailureResponse'
   */
  app.get(
    "/api/ad-attributes",
    [requireUser, authorize("AdAttributes", "read")],
    getAdAttributeHandler
  );
}

export default routes;
