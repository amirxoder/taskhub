import { email, success } from "zod";
import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { AuthService } from "../../services/v1/auth.service.js";
import { AppError } from "../../utils/AppError.js";

export const register = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;

    const existingUser = await AuthService.findUserByEmail(email);
    if (existingUser) {
      throw AppError.conflict("Email already registered", "EMAIL_EXISTS");
    }
    // create user
    const newUser = await AuthService.createUser({ name, password, email });

    res.status(200).json({
      success: true,
      data: newUser,
    });
  },
);
