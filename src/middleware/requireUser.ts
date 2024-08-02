import { Request, Response, NextFunction } from "express";
import { createResponse } from "../utils/response";

const requireUser = (req: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user;

  if (!user) {
    return res.status(403).json(createResponse(false, "Access denied. User not authenticated."));
  }

  return next();
};

export default requireUser;
