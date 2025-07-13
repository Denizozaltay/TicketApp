import { NextRequest, NextResponse } from "next/server";
import { getTicketById, deleteTicket } from "@/src/lib/db/models/ticket";
import { getAuthUserFromRequest } from "@/src/lib/auth/getAuthUser";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;

  try {
    const ticket = await getTicketById(id);

    if (!ticket) {
      return NextResponse.json({ error: "Ticket not found." }, { status: 404 });
    }

    return NextResponse.json(ticket, { status: 200 });
  } catch (err) {
    console.error("GET /api/tickets/:id error:", err);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;

    const user = await getAuthUserFromRequest(_req);
  
    if(user?.role !== "admin") { // Only admins can delete tickets
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 403 }
      );
    }

  try { 
    // Check if the ticket exists before deleting
    const ticket = await getTicketById(id);

    //if it does not exist, return 404
    if (!ticket) {
      return NextResponse.json({ error: "Ticket not found." }, { status: 404 });
    }

    await deleteTicket(id);

    return NextResponse.json({ success: true, deletedId: id }, { status: 200 });
  } catch (err) {
    console.error("DELETE /api/tickets/:id error:", err);
    return NextResponse.json(
      { error: "Failed to delete the ticket." },
      { status: 500 }
    );
  }
}
