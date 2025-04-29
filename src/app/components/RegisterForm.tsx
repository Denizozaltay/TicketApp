"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [email2, setEmail2] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("asd");

    //mailler aynı olmalı

    if (email != email2) {
      setError("Email adresses must be the same.");
      return;
    }

    //şifreler aynı olmalı
    if (password != password2) {
      setError("Passwords must be the same.");
      return;
    }

    if (password.trim().length <= 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setError("");

    // logic buraya yazilacak
    // email ve password değişkenleri var
    // bu degiskenleri auth'a POST istegi ile gonderebiliz, scope içinde
  };

  return (
    <>
      <div className="flex flex-col gap-10 bg-white shadow-lg rounded-lg w-fit p-30">
        <div className="flex flex-1 flex-col">
          <h1 className="text-3xl font-bold">Create Account</h1>
          <p className="text-sm font-light">Please enter your details</p>
        </div>
        <div className="flex">
          {/* formun register buttonuna herhangi bir action ekleme
            form oldugu icin otomatik olarak submit işlemi yapar
            TODO: handleSubmit metoduna logic eklenmeli
            */}

          <form className="flex flex-col gap-10" onSubmit={handleSubmit}>
            <div className="flex flex-1 w-90 flex-col gap-2">
              <label htmlFor="email">Email Adress</label>
              <Input
                type="email"
                id="email"
                placeholder="Email Adress"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label htmlFor="email2">Confirm Email Adress</label>
              <Input
                type="email2"
                id="email2"
                placeholder="Confirm Email Adress"
                value={email2}
                onChange={(e) => setEmail2(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password">Password</label>
              <Input
                type="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {}
              <label htmlFor="password2">Confirm Password</label>
              <Input
                type="password"
                id="password2"
                placeholder="Confirm Pasword"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                required
              />
            </div>

            {/* şifre/email aynı değilse uyar*/}
            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button className="font-medium cursor-pointer" variant="outline">
              <LogIn /> Register
            </Button>
          </form>
        </div>
        <div className="flex flex-row justify-between text-sm opacity-70">
          <p>Do you have an account?</p>
          {/*
                TODO: bu login formuna yönlendiren bir link olacak
                veyahutta form, sign up'a basınca conditional rendering ile login sayfası
                render edilebilir
                */}
          <Link href={"/login"} className="underline">
            Log in
          </Link>
        </div>
      </div>
    </>
  );
}
