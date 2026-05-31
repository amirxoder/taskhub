import * as z from "zod";

export const signUpSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 character"),
    email: z.string().email("Invalid Email address"),
    password: z.string().min(8, "password must be at least 8 characters long"),
    confirmPassword: z
      .string()
      .min(8, "password must be at least 8 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
