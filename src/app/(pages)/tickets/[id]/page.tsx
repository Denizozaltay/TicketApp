import TicketChat from "@/src/app/components/TicketChatPage/TicketChat";
import { AuthProvider } from "@/src/lib/auth/AuthContext";
import { getAuthUser } from "@/src/lib/auth/getAuthUser";
import { getTicketById } from "@/src/lib/db/models/ticket";
import Link from "next/link";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import Image from "next/image";

interface Props {
  params: { id: string };
}

// User tickets page role check

// if (pathname.startsWith("/my-tickets")) {
//   const ticketId = pathname.split("/").pop() || "";
//   const ticket = await getTicketById(ticketId);
//   if (ticket && ticket.userId !== user.id)
//     return NextResponse.redirect(new URL("/", req.url));
//   return NextResponse.next();
// }

export default async function TicketChatPage({ params }: Props) {
  const { id } = await params;
  const user = await getAuthUser();

  const ticket = await getTicketById(id);

  if (ticket && ticket.userId !== user?.id) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-5">
        <Image
          src="/guyondoor.jpg"
          alt="Guy on door"
          width={200}
          height={200}
        />
        <div className="flex flex-row items-center justify-center">
          <p>You do not have access to this ticket.</p>
          <br />
          <Link className="font-bold underline" href={"/my-tickets"}>
            Click to go your tickets
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {user ? (
        <AuthProvider
          value={{ userId: user.id, username: user.username, role: user.role }}
        >
          <TicketChat ticketId={id} userId={user.id} role={user.role} />
        </AuthProvider>
      ) : (
        <p>not logged in</p>
      )}
    </>
  );
}
