import { prisma } from "@/src/lib/db/prisma";
import type { TicketMessageInput } from "@/src/types/ticketMessage";

export async function getAllMessagesByTicketId(ticketId: string) {
  return prisma.ticketMessage.findMany({
    where: { ticketId },
    orderBy: { createdAt: "asc" },
  });
}

export async function createTicketMessage(data: TicketMessageInput) {
  return prisma.ticketMessage.create({
    data,
  });
}
