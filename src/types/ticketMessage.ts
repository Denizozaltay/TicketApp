export interface TicketMessageInput {
  content: string;
  ticketId: string;
  userId: string;
}

export interface TicketMessage extends TicketMessageInput {
  id: string;
  createdAt: Date;
}
