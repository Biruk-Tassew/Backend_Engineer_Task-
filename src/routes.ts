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
import { handleVideoCompression, upload } from "./middleware/upload.middleware";
import { createAdGraphicHandler, deleteAdGraphicHandler, getAdGraphicHandler, updateAdGraphicHandler } from "./controller/adGraphic.controller";
import { createAdGraphicSchema, updateAdGraphicSchema } from "./schema/adGraphic.schema";
import { validateFilePresence } from "./middleware/validateFilePresence";

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
    [requireUser, upload.single('file'), handleVideoCompression, validateFilePresence , validateResource(createAdGraphicSchema)],
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
    [requireUser, upload.single('file'), handleVideoCompression, validateResource(updateAdGraphicSchema)],
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
    [requireUser, validateResource(createAdGraphicSchema)],
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
   * '/api/products':
   *  post:
   *     tags:
   *     - Products
   *     summary: Create a new product
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schema/Product'
   *     responses:
   *       200:
   *         description: Product created
   *         content:
   *          application/json:
   *           schema:
   *              $ref: '#/components/schema/productResponse'
   *           example:
   *             "user": "642a0de05f16e6dad68efdad"
   *             "title": "Canon EOS 1500D DSLR Camera with 18-55mm Lens"
   *             "description": "Designed for first-time DSLR owners who want impressive results straight out of the box, capture those magic moments no matter your level with the EOS 1500D. With easy to use automatic shooting modes, large 24.1 MP sensor, Canon Camera Connect app integration and built-in feature guide, EOS 1500D is always ready to go."
   *             "price": 879.99
   *             "image": "https://i.imgur.com/QlRphfQ.jpg"
   *             "_id": "642a1cfcc1bec76d8a2e7ac2"
   *             "productId": "product_xxqm8z3eho"
   *             "createdAt": "2023-04-03T00:25:32.189Z"
   *             "updatedAt": "2023-04-03T00:25:32.189Z"
   *             "__v": 0
   */
  app.post(
    "/api/products",
    [requireUser, validateResource(createProductSchema)],
    createProductHandler
  );

  /**
   * @openapi
   * '/api/products/{productId}':
   *  get:
   *     tags:
   *     - Products
   *     summary: Get a single product by the productId
   *     parameters:
   *      - name: productId
   *        in: path
   *        description: The id of the product
   *        required: true
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *          application/json:
   *           schema:
   *              $ref: '#/components/schema/productResponse'
   *       404:
   *         description: Product not found
   *  put:
   *     tags:
   *     - Products
   *     summary: Update a single product
   *     parameters:
   *      - name: productId
   *        in: path
   *        description: The id of the product
   *        required: true
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schema/Product'
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *          application/json:
   *           schema:
   *              $ref: '#/components/schema/productResponse'
   *       403:
   *         description: Forbidden
   *       404:
   *         description: Product not found
   *  delete:
   *     tags:
   *     - Products
   *     summary: Delete a single product
   *     parameters:
   *      - name: productId
   *        in: path
   *        description: The id of the product
   *        required: true
   *     responses:
   *       200:
   *         description: Product deleted
   *       403:
   *         description: Forbidden
   *       404:
   *         description: Product not found
   */
  app.put(
    "/api/products/:productId",
    [requireUser, validateResource(updateProductSchema)],
    updateProductHandler
  );

  app.get(
    "/api/products/:productId",
    validateResource(getProductSchema),
    getProductHandler
  );

  app.delete(
    "/api/products/:productId",
    [requireUser, validateResource(deleteProductSchema)],
    deleteProductHandler
  );
}

export default routes;
