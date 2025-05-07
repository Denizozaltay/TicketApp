import { PublicUser } from "@/src/types/user";
import { transporter } from "./transporter";

export async function sendForgotPassEmail(
  email: string,
  token: string
) {
  const confirmUrl = `${process.env.BASE_URL}/changepassword?token=${token}`;

  await transporter.sendMail({
    from: `"HardEnder Team" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Change your password",
    html: `
      <h2>Hello ${email},</h2>
      <p>Please change your password by clicking the link below:</p>
      <a href="${confirmUrl}">Change Password</a>
      <p>If you didn't request this, please reach us immediately for security measures.</p>
    `,
  });
}
