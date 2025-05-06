import { AuthProvider } from "../lib/auth/AuthContext";
import { getAuthUser } from "../lib/auth/getAuthUser";
import TicketForm from "./components/CreateTicketPage/TicketForm";

export default async function HomePage() {
  const user = await getAuthUser();

  return (
    <>
      <AuthProvider
        value={{ userId: user?.id, username: user?.username, role: user?.role }}
      >
        <TicketForm />
      </AuthProvider>
    </>
  );
}
