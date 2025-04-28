import { NextRequest, NextResponse } from "next/server";
import { getTicketById, archiveTicket } from "@/src/lib/db/models/ticket";

export async function PATCH(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;

  try {
    const ticket = await getTicketById(id);

    if (!ticket) {
      return NextResponse.json({ error: "Ticket not found." }, { status: 404 });
    }

    const updatedTicket = await archiveTicket(id);

    return NextResponse.json(updatedTicket, { status: 200 });
  } catch (err) {
    console.error("PATCH /api/tickets/:id/archive error:", err);
    return NextResponse.json(
      { error: "Failed to archive the ticket." },
      { status: 500 }
    );
  }
}
