import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/src/lib/auth/getAuthUser";
import { TicketMessageInput } from "@/src/types/ticketMessage";
import {
  createTicketMessage,
  getAllMessagesByTicketId,
} from "@/src/lib/db/models/ticketMessage";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const user = await getAuthUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const messages = await getAllMessagesByTicketId(id);

  return NextResponse.json(messages, { status: 200 });
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const user = await getAuthUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body: TicketMessageInput = await req.json();

  const message = await createTicketMessage({
    content: body.content,
    ticketId: id,
    userId: user.id,
  });

  return NextResponse.json(message, { status: 201 });
}
