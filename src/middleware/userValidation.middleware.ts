import { Request, Response, NextFunction } from "express";
import { findUserByEmail } from "../service/user.service"; // Assume this service function exists and retrieves a user by email

export async function checkEmailNotUsed(req: Request, res: Response, next: NextFunction) {
  try {
    const email = req.body.email;
    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ success: false, message: "Email is already in use" });
    }

    next();
  } catch (error: unknown) {
    let errorMessage = 'Internal Server Error';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return res.status(500).json({ success: false, message: errorMessage });
  }
}
