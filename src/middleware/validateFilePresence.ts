import { Request, Response, NextFunction } from 'express';

export const validateFilePresence = (req: Request, res: Response, next: NextFunction) => {
  if (!req.file) {
    return res.status(400).send({ error: 'File is required' });
  }
  next();
};
