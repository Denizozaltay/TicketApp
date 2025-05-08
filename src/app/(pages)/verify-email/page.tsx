import { verifyUserEmail } from "@/src/lib/db/models/user";
import { redirect } from "next/navigation";

type Props = {
  searchParams: { token?: string };
};

export default async function VerifyEmailPage({ searchParams }: Props) {
  const param = await searchParams;
  const token = param.token;

  if (!token) {
    redirect("/");
  }

  const user = await verifyUserEmail(token);
  const isVerified = !!user;

  return (
    <section className="flex flex-col items-center justify-center h-screen w-screen gap-5 md:gap-10 bg-gray-50">
      <p className="m-0 text-[64px] md:text-[96px] font-semibold bg-gradient-to-b from-[#006EFF] via-[#00BCFF] to-[#00D9FF] bg-clip-text text-transparent">
        {isVerified ? "All Done!" : "Oops!"}
      </p>
      <p className="text-xl md:text-2xl text-black/60 text-center px-4">
        {isVerified
          ? "Your email has been successfully verified."
          : "Invalid or expired verification link."}
      </p>
      <p className="text-xl md:text-lg text-black/50 text-center px-4">
        {isVerified
          ? "You can now log in to your account."
          : "Please request a new link or try again later."}
      </p>
    </section>
  );
}
