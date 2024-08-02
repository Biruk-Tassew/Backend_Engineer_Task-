import { Request, Response } from "express";
import { CreateUserInput } from "../schema/user.schema";
import { createUser } from "../service/user.service";
import logger from "../utils/logger";
import { createResponse } from "../utils/response"; 

export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput["body"]>,
  res: Response
): Promise<Response> {
  try {
    const user = await createUser(req.body);
    return res.status(201).json(createResponse(true, "User created successfully", user));
  } catch (e: unknown) {
    let errorMessage = 'Conflict';
    if (e instanceof Error) {
      errorMessage = e.message;
    }
    logger.error(e);
    return res.status(409).json(createResponse(false, errorMessage, null, e));
  }
}
