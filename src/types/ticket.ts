export interface TicketInput {
  username: string;
  title: string;
  content: string;
  userId: string;
}

export interface Ticket extends TicketInput {
  id: string;
  createdAt: Date;
  isArchived: boolean;
}

export type DataTableTicket = Pick<
  Ticket,
  "id" | "username" | "title" | "createdAt"
>;
