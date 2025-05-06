import TicketChat from "@/src/app/components/TicketChatPage/TicketChat";
import { AuthProvider } from "@/src/lib/auth/AuthContext";
import { getAuthUser } from "@/src/lib/auth/getAuthUser";
import { getTicketById } from "@/src/lib/db/models/ticket";
import { getAllMessagesByTicketId } from "@/src/lib/db/models/ticketMessage";

interface Props {
    params: { id: string };
  }


export default async function TicketChatPage({ params: {id} }: Props) {
    

    const user = await getAuthUser();
    const ticket = await getTicketById(id);
    const messages = await getAllMessagesByTicketId(id)



  
  return (
    <>
    {user && ticket && messages ? (
      <AuthProvider
        value={{ userId: user.id, username: user.username, role: user.role }}
      >
        <TicketChat
        ticket={{
          id: ticket.id,
          title: ticket.title,
          username: ticket.username,
          createdAt: ticket.createdAt.toISOString(),
          content: ticket.content,
          isArchived: ticket.isArchived,
          userId: ticket.userId,
        }}
        ticketMessages={messages}
        userId={user.id}
        />
      </AuthProvider>
    ) : (
      <p>Loading...</p>
    )}
    </>
  );
}
