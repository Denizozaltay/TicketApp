import { redirect } from "next/navigation";
import ResetPassword from "../../components/RequestPassResetPage/ResetPassword";

type Props = {
  searchParams: { token?: string };
};

export default async function ChangePassword({ searchParams }: Props) {
  const param = await searchParams;
  const token = param.token;

  if (!token) {
    redirect("/");
  }

  return (
    <>
      <ResetPassword token={token} />
    </>
  );
}
