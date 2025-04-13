import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Ticket, TicketInput } from "@/src/types/ticket";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const tickets: Ticket[] = await prisma.ticket.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(tickets);
  } catch (err) {
    console.error("GET /api/tickets error:", err);
    return NextResponse.json({ error: "Listeleme hatası" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body: TicketInput = await req.json();
    const { username, title, content } = body;

    if (!username?.trim() || !title?.trim() || !content?.trim()) {
      return NextResponse.json(
        { error: "Kullanıcı adı, başlık ve içerik zorunludur" },
        { status: 400 }
      );
    }

    const newTicket: Ticket = await prisma.ticket.create({
      data: { username, title, content },
    });

    return NextResponse.json(newTicket, { status: 201 });
  } catch (err) {
    console.error("POST /api/tickets error:", err);
    return NextResponse.json({ error: "Oluşturma hatası" }, { status: 500 });
  }
}
