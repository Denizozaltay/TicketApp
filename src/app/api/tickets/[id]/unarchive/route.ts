import { NextRequest, NextResponse } from "next/server";
import { getTicketById, unarchiveTicket } from "@/src/lib/db/models/ticket";
import { getAuthUserFromRequest } from "@/src/lib/auth/getAuthUser";
import { getUserById } from "@/src/lib/db/models/user";
import { sendTicketStatusEmail } from "@/src/lib/mail/sendTicketStatusEmail";

export async function PATCH(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;

  try {
    const ticket = await getTicketById(id);
    const user = await getAuthUserFromRequest(_req);
    const ticketOwner = ticket?.userId ? await getUserById(ticket.userId) : null;
    

    if (!ticket) {
      return NextResponse.json({ error: "Ticket not found." }, { status: 404 });
    }

    if (ticket.userId === user?.id || user?.role === "admin") {
      // Only admins or ticket owner can unarchive tickets

      const updatedTicket = await unarchiveTicket(id); // update the ticket

      await sendTicketStatusEmail( //sent email notification to the user
                ticketOwner?.username || "User",
                ticketOwner?.email || "",
                id);

      return NextResponse.json(updatedTicket, { status: 200 }); // return success response
      
    } else {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }
  } catch (err) {
    console.error("PATCH /api/tickets/:id/unarchive error:", err);
    return NextResponse.json(
      { error: "Failed to unarchive the ticket." },
      { status: 500 }
    );
  }
}
