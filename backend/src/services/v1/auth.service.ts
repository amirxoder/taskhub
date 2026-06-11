import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../../models/user.model.js";
import { env } from "../../config/env.js";
import Verification from "../../models/verification.model.js";
import { sendVerificationEmail } from "../../utils/sendVerificationEmail.js";

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
    console.log("Creating user with data:", userData);
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

    await Verification.create({
      userId: user._id,
      token,
      expiresAt: new Date(Date.now() + 60 * 60 * 1000),
    });

    // send email
    await sendVerificationEmail(userData.email, token);

    return { ...userWithoutPassword, token };
  }
}
