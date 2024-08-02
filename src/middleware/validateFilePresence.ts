import { Request, Response, NextFunction } from 'express';
import { createResponse } from '../utils/response';

export const validateFilePresence = (req: Request, res: Response, next: NextFunction) => {
  if (!req.file) {
    return res.status(400).json(createResponse(false, 'File is required'));
  }
  next();
};
