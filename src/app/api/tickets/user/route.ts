import { getAuthUser } from "@/src/lib/auth/getAuthUser";
import { getUserTickets } from "@/src/lib/db/models/ticket";
import { NextResponse } from "next/server";

export async function GET() {
  const user = await getAuthUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const tickets = await getUserTickets(user.id);

    return NextResponse.json(tickets, { status: 200 });
  } catch (err) {
    console.error("GET /api/tickets/user error:", err);
    return NextResponse.json(
      { message: "Failed to fetch tickets." },
      { status: 500 }
    );
  }
}
