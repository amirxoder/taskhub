import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../../models/user.model.js";
import { AppError } from "../../utils/AppError.js";
import { env } from "../../config/env.js";

export class AuthService {
  // Find user by email (exclude password by default)
  static async findUserByEmail(email: string) {
    return await User.findOne({ email });
  }

  // Find user by email include the password filed (for Login)
  static async findUserWithPassword(email: string) {
    return await User.findOne({ email }).select("+password");
  }

  //   Create new user with hashed password

  static async createUser(userData: {
    email: string;
    password: string;
    name: string;
  }) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = await User.create({
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
    });
    const { password, ...userWithoutPassword } = user.toObject();

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      env.JWT_SECRET!,
      { expiresIn: "1d" },
    );
    return { ...userWithoutPassword, token };
  }
}
