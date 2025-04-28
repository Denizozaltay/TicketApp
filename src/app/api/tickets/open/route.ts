import { getOpenTickets } from "@/src/lib/db/models/ticket";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const openTickets = await getOpenTickets();
    return NextResponse.json(openTickets, { status: 200 });
  } catch (err) {
    console.error("GET /api/tickets/open error:", err);
    return NextResponse.json(
      { error: "Failed to fetch open tickets." },
      { status: 500 }
    );
  }
}
