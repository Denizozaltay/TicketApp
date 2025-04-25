import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PATCH(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const ticket = await prisma.ticket.findUnique({ where: { id } });

    if (!ticket) {
      return NextResponse.json({ error: "Ticket bulunamadı" }, { status: 404 });
    }

    const updated = await prisma.ticket.update({
      where: { id },
      data: { isArchived: true },
    });

    return NextResponse.json(updated);
  } catch (err) {
    return NextResponse.json({ error: "Arşivleme hatası" }, { status: 500 });
  }
}
