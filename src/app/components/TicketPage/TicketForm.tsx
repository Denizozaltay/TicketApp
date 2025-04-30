"use client";

import { roboto } from "@/src/lib/fonts";
import { useState } from "react";
import TicketFormCard from "./TicketFormCard";
import SuccessPane from "./SuccessPane";
import LogoutButton from "./LogoutButton";
import { useAuth } from "@/src/lib/auth/AuthContext";
import AuthButtons from "./AuthButtons";

export default function TicketForm() {
  const { userId } = useAuth();
  const [isSuccess, setIsSuccess] = useState(false);

  return (
    <main className={`${roboto.className} relative min-h-screen bg-gray-50`}>
      <div className="absolute top-4 right-4 z-50">
        {userId ? <LogoutButton /> : <AuthButtons />}
      </div>

      <div className="flex flex-col items-center justify-center min-h-screen px-4 gap-12">
        {!isSuccess && (
          <h1 className="text-4xl md:text-6xl text-center font-bold bg-gradient-to-b from-[#006EFF] via-[#00BCFF] to-[#00D9FF] bg-clip-text text-transparent">
            Share your thoughts with us!
          </h1>
        )}

        {isSuccess ? (
          <SuccessPane />
        ) : (
          <TicketFormCard onSuccess={() => setIsSuccess(true)} />
        )}
      </div>
    </main>
  );
}
