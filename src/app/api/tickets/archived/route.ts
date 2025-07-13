import { getAuthUserFromRequest } from "@/src/lib/auth/getAuthUser";
import { getArchivedTickets } from "@/src/lib/db/models/ticket";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const user = await getAuthUserFromRequest(req);

  if(user?.role !== "admin") { // Only admins can access archived tickets
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 403 }
    );
  }

  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    const archivedTickets = await getArchivedTickets(page, limit);
    return NextResponse.json(archivedTickets, { status: 200 });
  } catch (err) {
    console.error("GET /api/tickets/archived error:", err);
    return NextResponse.json(
      { error: "Failed to fetch archived tickets." },
      { status: 500 }
    );
  }
}
