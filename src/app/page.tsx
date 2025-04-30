import { getAuthUser } from "../lib/auth/getAuthUser";
import AuthWrapper from "./components/AuthWrapper";
import TicketForm from "./components/TicketPage/TicketForm";

export default async function HomePage() {
  const user = await getAuthUser();

  return (
    <>
      <AuthWrapper user={user}>
        <TicketForm />
      </AuthWrapper>
    </>
  );
}
