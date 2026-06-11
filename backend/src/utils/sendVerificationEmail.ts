import { resend } from "../lib/resend.js";
import { env } from "../config/env.js";

export const sendVerificationEmail = async (email: string, token: string) => {
  const verifyUrl = `${env.FRONTEND_URL}/verify-email?token=${token}`;

  console.log("Sending verification email to:", email);
  console.log("Verification URL:", verifyUrl);

  await resend.emails.send({
    from: "no-reply@yourdomain.com",
    to: email,
    subject: "Verify your email",
    html: `
      <h2>Email Verification</h2>
      <p>Click the link below to verify your email:</p>
      <a href="${verifyUrl}">Verify Email</a>
      <p>This link expires in 24 hours.</p>
    `,
  });
};
