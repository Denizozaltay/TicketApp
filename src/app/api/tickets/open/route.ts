import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(_req: NextRequest) {
  try {
    const archivedTickets = await prisma.ticket.findMany({
      where: { isArchived: false },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(archivedTickets);
  } catch (err) {
    return NextResponse.json(
      { error: "Arşivlenmiş ticketlar alınamadı" },
      { status: 500 }
    );
  }
}
