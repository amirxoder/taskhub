import * as z from "zod";

export const signInSchema = z.object({
  email: z.string().email("Invalid Email"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});
