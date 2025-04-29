import { redirect } from "next/navigation";
import RegisterForm from "../../components/RegisterPage/RegisterForm";
import { getAuthUser } from "@/src/lib/auth/getAuthUser";

export default async function RegisterPage() {
  const user = await getAuthUser();

  if (user) {
    redirect("/");
  }
  return (
    <>
      <RegisterForm />
    </>
  );
}
