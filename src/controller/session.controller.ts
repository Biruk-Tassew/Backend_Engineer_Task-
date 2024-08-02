import { Request, Response } from "express";
import config from "config";
import {
  createSession,
  findSessions,
  updateSession,
} from "../service/session.service";
import { validatePassword } from "../service/user.service";
import { signJwt } from "../utils/jwt.utils";
import { createResponse } from "../utils/response"; 

export async function createUserSessionHandler(req: Request, res: Response): Promise<Response> {
  try {
    // Validate the user's password
    const user = await validatePassword(req.body);

    if (!user) {
      return res.status(401).json(createResponse(false, "Invalid email or password", null));
    }

    // Create a session
    const session = await createSession(user._id, req.get("user-agent") || "");

    // Create an access token
    const accessToken = signJwt(
      { ...user, session: session._id },
      "accessTokenPrivateKey",
      { expiresIn: config.get("accessTokenTtl") } // 15 minutes,
    );

    // Create a refresh token
    const refreshToken = signJwt(
      { ...user, session: session._id },
      "refreshTokenPrivateKey",
      { expiresIn: config.get("refreshTokenTtl") } // 15 minutes
    );

    // Return access & refresh tokens
    return res.json(createResponse(true, "Session created successfully", { accessToken, refreshToken }));
  } catch (error: unknown) {
    console.error('Error in createUserSessionHandler:', error);
    return res.status(500).json(createResponse(false, 'Internal Server Error', null, error));
  }
}

export async function getUserSessionsHandler(req: Request, res: Response): Promise<Response> {
  try {
    const userId = res.locals.user._id;

    const sessions = await findSessions({ user: userId, valid: true });

    return res.json(createResponse(true, "Sessions retrieved successfully", sessions));
  } catch (error: unknown) {
    console.error('Error in getUserSessionsHandler:', error);
    return res.status(500).json(createResponse(false, 'Internal Server Error', null, error));
  }
}

export async function deleteSessionHandler(req: Request, res: Response): Promise<Response> {
  try {
    const sessionId = res.locals.user.session;

    await updateSession({ _id: sessionId }, { valid: false });

    return res.json(createResponse(true, "Session deleted successfully", { accessToken: null, refreshToken: null }));
  } catch (error: unknown) {
    console.error('Error in deleteSessionHandler:', error);
    return res.status(500).json(createResponse(false, 'Internal Server Error', null, error));
  }
}
