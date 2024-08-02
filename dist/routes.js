"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const session_controller_1 = require("./controller/session.controller");
const user_controller_1 = require("./controller/user.controller");
const requireUser_1 = __importDefault(require("./middleware/requireUser"));
const validateResource_1 = __importDefault(require("./middleware/validateResource"));
const session_schema_1 = require("./schema/session.schema");
const user_schema_1 = require("./schema/user.schema");
const adGraphic_controller_1 = require("./controller/adGraphic.controller");
const adGraphic_schema_1 = require("./schema/adGraphic.schema");
const upload_middleware_1 = __importDefault(require("./middleware/upload.middleware"));
const ad_controller_1 = require("./controller/ad.controller");
const adAttributes_controller_1 = require("./controller/adAttributes.controller");
const authorization_middleware_1 = __importDefault(require("./middleware/authorization.middleware"));
const userValidation_middleware_1 = require("./middleware/userValidation.middleware");
function routes(app) {
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
    app.get("/healthcheck", (req, res) => res.sendStatus(200));
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
    app.post("/api/ad-graphics", [requireUser_1.default, (0, authorization_middleware_1.default)("AdGraphics", "create"), upload_middleware_1.default.single('file'), (0, validateResource_1.default)(adGraphic_schema_1.createAdGraphicSchema)], adGraphic_controller_1.createAdGraphicHandler);
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
    app.get("/api/ad-graphics/:id", [requireUser_1.default, (0, authorization_middleware_1.default)("User", "read")], (0, validateResource_1.default)(adGraphic_schema_1.createAdGraphicSchema), adGraphic_controller_1.getAdGraphicHandler);
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
    app.put("/api/ad-graphics/:id", [requireUser_1.default, (0, authorization_middleware_1.default)("User", "update"), upload_middleware_1.default.single('file'), (0, validateResource_1.default)(adGraphic_schema_1.updateAdGraphicSchema)], adGraphic_controller_1.updateAdGraphicHandler);
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
    app.delete("/api/ad-graphics/:id", [requireUser_1.default, (0, authorization_middleware_1.default)("User", "delete"), (0, validateResource_1.default)(adGraphic_schema_1.createAdGraphicSchema)], adGraphic_controller_1.deleteAdGraphicHandler);
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
    app.post("/api/users", [userValidation_middleware_1.checkEmailNotUsed, (0, validateResource_1.default)(user_schema_1.createUserSchema)], user_controller_1.createUserHandler);
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
    app.post("/api/sessions", (0, validateResource_1.default)(session_schema_1.createSessionSchema), session_controller_1.createUserSessionHandler);
    app.get("/api/sessions", requireUser_1.default, session_controller_1.getUserSessionsHandler);
    app.delete("/api/sessions", requireUser_1.default, session_controller_1.deleteSessionHandler);
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
    app.post("/api/ads", [requireUser_1.default, (0, authorization_middleware_1.default)("Ad", "create")], ad_controller_1.createAdHandler);
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
    app.put("/api/ads/:id", [requireUser_1.default, (0, authorization_middleware_1.default)("Ad", "update")], ad_controller_1.updateAdHandler);
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
    app.delete("/api/ads/:id", [requireUser_1.default, (0, authorization_middleware_1.default)("Ad", "delete")], ad_controller_1.deleteAdHandler);
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
    app.get("/api/ads/:id", [requireUser_1.default, (0, authorization_middleware_1.default)("Ad", "read")], ad_controller_1.getAdHandler);
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
    app.get("/api/ads", [requireUser_1.default, (0, authorization_middleware_1.default)("Ad", "read")], ad_controller_1.getAllAdsHandler);
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
    app.post("/api/ad-attributes", [requireUser_1.default, (0, authorization_middleware_1.default)("AdAttributes", "create")], adAttributes_controller_1.createAdAttributeHandler);
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
    app.put("/api/ad-attributes/:id", [requireUser_1.default, (0, authorization_middleware_1.default)("AdAttributes", "update")], adAttributes_controller_1.updateAdAttributeHandler);
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
    app.delete("/api/ad-attributes/:id", [requireUser_1.default, (0, authorization_middleware_1.default)("AdAttributes", "delete")], adAttributes_controller_1.deleteAdAttributeHandler);
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
    app.get("/api/ad-attributes/ad/:adId", [requireUser_1.default, (0, authorization_middleware_1.default)("AdAttributes", "read")], adAttributes_controller_1.getAdAttributeByAdHandler);
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
    app.get("/api/ad-attributes", [requireUser_1.default, (0, authorization_middleware_1.default)("AdAttributes", "read")], adAttributes_controller_1.getAdAttributeHandler);
}
exports.default = routes;
