"use client";

import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.message || "Login failed.");
        return;
      }

      setError("");
      router.push("/");
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error("Login error:", err);
    }
  }

  return (
    <div className="flex flex-col gap-10 bg-white shadow-lg rounded-lg w-fit p-10">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold">Welcome Back</h1>
        <p className="text-sm font-light">Please enter your details</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-80">
        <div>
          <label htmlFor="email">Email Address</label>
          <Input
            id="email"
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <Input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-row items-center gap-3">
          <Checkbox id="remember" />
          <label htmlFor="remember" className="text-sm">
            Remember me
          </label>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <Button
          type="submit"
          className="font-medium cursor-pointer"
          variant="outline"
        >
          <LogIn className="mr-2 h-4 w-4" /> Login
        </Button>
      </form>

      <div className="flex flex-row justify-between text-sm opacity-70">
        <p>Don’t have an account?</p>
        <Link href="/register" className="underline">
          Sign Up
        </Link>
      </div>
    </div>
  );
}
