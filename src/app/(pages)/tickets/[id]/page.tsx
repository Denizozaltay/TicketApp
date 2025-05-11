import TicketChat from "@/src/app/components/TicketChatPage/TicketChat";
import { AuthProvider } from "@/src/lib/auth/AuthContext";
import { getAuthUser } from "@/src/lib/auth/getAuthUser";

interface Props {
  params: { id: string };
}

export default async function TicketChatPage({ params }: Props) {
  const { id } = await params;
  const user = await getAuthUser();

  return (
    <>
      {user ? (
        <AuthProvider
          value={{ userId: user.id, username: user.username, role: user.role }}
        >
          <TicketChat ticketId={id} userId={user.id} />
        </AuthProvider>
      ) : (
        <p>not logged in</p>
      )}
    </>
  );
}
