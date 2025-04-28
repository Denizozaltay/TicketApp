import { NextRequest, NextResponse } from "next/server";
import { getTicketById, deleteTicket } from "@/src/lib/db/models/ticket";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

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

  try {
    const ticket = await getTicketById(id);

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
