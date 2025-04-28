import { prisma } from "@/src/lib/db/prisma";
import { TicketInput } from "@/src/types/ticket";

export async function getAllTickets() {
  return prisma.ticket.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function createTicket(data: TicketInput) {
  return prisma.ticket.create({
    data,
  });
}

export async function getOpenTickets() {
  return prisma.ticket.findMany({
    where: { isArchived: false },
    orderBy: { createdAt: "desc" },
  });
}

export async function getArchivedTickets() {
  return prisma.ticket.findMany({
    where: { isArchived: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function archiveTicket(id: string) {
  return prisma.ticket.update({
    where: { id },
    data: { isArchived: true },
  });
}

export async function unarchiveTicket(id: string) {
  return prisma.ticket.update({
    where: { id },
    data: { isArchived: false },
  });
}

export async function deleteTicket(id: string) {
  return prisma.ticket.delete({
    where: { id },
  });
}

export async function getTicketById(id: string) {
  return prisma.ticket.findUnique({
    where: { id },
  });
}
