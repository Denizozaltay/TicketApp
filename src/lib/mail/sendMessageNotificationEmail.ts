import { transporter } from "./transporter";

export async function sendMessageNotificationEmail(
  username: string,
  email: string,
  ticketId: string
) {
  const ticketUrl = `${process.env.BASE_URL}/tickets/${ticketId}`;

  await transporter.sendMail({
    from: `"HardEnder Team" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "New message notification",
    html: `
          <h2>Hello ${username},</h2>
          <p>You have a new message in ticket. Please check it out:</p>
          <a href="${ticketUrl}">Ticket</a>
          <p>If you didn't request this, you can ignore this email.</p>
        `,
  });
}
