export interface TicketInput {
  username: string;
  title: string;
  content: string;
}

export interface Ticket extends TicketInput {
  id: string;
  createdAt: Date;
}
