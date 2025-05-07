import { transporter } from "./transporter";

export async function sendVerificationEmail(
  username: string,
  email: string,
  token: string
) {
  const confirmUrl = `${process.env.BASE_URL}/verify-email?token=${token}`;

  await transporter.sendMail({
    from: `"HardEnder Team" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Verify your email",
    html: `
      <h2>Hello ${username},</h2>
      <p>Please verify your email by clicking the link below:</p>
      <a href="${confirmUrl}">Verify Email</a>
      <p>If you didn't request this, you can ignore this email.</p>
    `,
  });
}
