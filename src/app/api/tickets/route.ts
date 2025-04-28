import { NextRequest, NextResponse } from "next/server";
import { TicketInput } from "@/src/types/ticket";
import { getAllTickets, createTicket } from "@/src/lib/db/models/ticket";

export async function GET() {
  try {
    const tickets = await getAllTickets();

    return NextResponse.json(tickets, { status: 200 });
  } catch (err) {
    console.error("GET /api/tickets error:", err);
    return NextResponse.json(
      { message: "Failed to fetch tickets." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body: TicketInput = await req.json();
    const { username, title, content, userId } = body;

    if (
      !username?.trim() ||
      !title?.trim() ||
      !content?.trim() ||
      !userId?.trim()
    ) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const newTicket = await createTicket({ username, title, content, userId });

    return NextResponse.json(newTicket, { status: 201 });
  } catch (err) {
    console.error("POST /api/tickets error:", err);
    return NextResponse.json(
      { message: "Error creating ticket" },
      { status: 500 }
    );
  }
}
