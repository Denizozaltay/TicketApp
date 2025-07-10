import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/src/lib/auth/getAuthUser";
import { TicketMessageInput } from "@/src/types/ticketMessage";
import {
  createTicketMessage,
  getAllMessagesByTicketId,
  getTicketMessageByTicketId,
} from "@/src/lib/db/models/ticketMessage";
import { sendMessageNotificationEmail } from "@/src/lib/mail/sendMessageNotificationEmail";
import { getTicketById } from "@/src/lib/db/models/ticket";
import { getUserById } from "@/src/lib/db/models/user";

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

  if (user.role !== "user") {
    const ticketMessage = await getTicketMessageByTicketId(id);
    if (ticketMessage) {
      const ticketOwner = await getUserById(ticketMessage.userId);
      if (user.id === ticketOwner?.id) {
        return NextResponse.json(
          { message: "You cannot send a message to yourself." },
          { status: 400 }
        );
      } else {
        await sendMessageNotificationEmail(
          ticketOwner.username || "User",
          ticketOwner.email,
          id,
        );
        return NextResponse.json(message, { status: 201 });
      }
    }
    // If no ticketMessage found, just return the created message
    return NextResponse.json(message, { status: 201 });
  }

  // If user.role === "user", just return the created message
  return NextResponse.json(message, { status: 201 });
}
