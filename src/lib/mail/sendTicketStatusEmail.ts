import { transporter } from "./transporter";

export async function sendTicketStatusEmail(
  username: string,
  email: string,
  ticketId: string,
) {
  const ticketUrl = `${process.env.BASE_URL}/tickets/${ticketId}`;

  await transporter.sendMail({
    from: `"HardEnder Team" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your ticket status has been updated",
    html: `
          <h2>Hello ${username},</h2>
          <p>Your ticket status have been updated, please take a look to get informed.</p>
          <a href="${ticketUrl}">Ticket</a>
          
          <p>If you didn't request this, please inform us.</p>
        `,
  });
}
