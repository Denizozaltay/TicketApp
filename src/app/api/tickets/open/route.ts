import { getOpenTickets } from "@/src/lib/db/models/ticket";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    const openTickets = await getOpenTickets(page, limit);
    return NextResponse.json(openTickets, { status: 200 });
  } catch (err) {
    console.error("GET /api/tickets/open error:", err);
    return NextResponse.json(
      { error: "Failed to fetch open tickets." },
      { status: 500 }
    );
  }
}
