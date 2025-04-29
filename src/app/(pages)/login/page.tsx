import { getAuthUser } from "@/src/lib/auth/getAuthUser";
import LoginForm from "../../components/LoginPage/LoginForm";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const user = await getAuthUser();

  if (user) {
    redirect("/");
  }
  return (
    <>
      <LoginForm />
    </>
  );
}
