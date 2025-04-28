import { getArchivedTickets, getOpenTickets } from "@/src/lib/db/models/ticket";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const archivedTickets = await getArchivedTickets();
    return NextResponse.json(archivedTickets, { status: 200 });
  } catch (err) {
    console.error("GET /api/tickets/archived error:", err);
    return NextResponse.json(
      { error: "Failed to fetch archived tickets." },
      { status: 500 }
    );
  }
}
