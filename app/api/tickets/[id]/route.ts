import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Ticket } from "@/app/types/ticket";

const prisma = new PrismaClient();

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const ticket: Ticket | null = await prisma.ticket.findUnique({
      where: { id },
    });

    if (!ticket) {
      return NextResponse.json({ error: "Ticket bulunamadı" }, { status: 404 });
    }

    return NextResponse.json(ticket);
  } catch (err) {
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const ticket = await prisma.ticket.findUnique({ where: { id } });

    if (!ticket) {
      return NextResponse.json({ error: "Ticket bulunamadı" }, { status: 404 });
    }

    await prisma.ticket.delete({ where: { id } });

    return NextResponse.json({ success: true, deletedId: id });
  } catch (err) {
    return NextResponse.json({ error: "Silme hatası" }, { status: 500 });
  }
}
