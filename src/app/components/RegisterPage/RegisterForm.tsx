"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoaderCircle, LogIn } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    if (password !== password2) {
      setError("Passwords must be the same.");
      setIsLoading(false);
      return;
    }

    if (password.trim().length < 8) {
      setError("Password must be at least 8 characters.");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.message || "Registration failed.");
        setIsLoading(false);
        return;
      }

      setError("");
      router.push("/login");
    } catch (err) {
      console.error("Register error:", err);
      setError("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="flex flex-col gap-10 bg-white w-fit p-10 rounded-lg shadow-lg overflow-hidden border-1 border-solid border-gray-200">
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold">Create Account</h1>
              <p className="text-sm font-light">Please enter your details</p>
            </div>

            <form className="flex flex-col gap-10 w-80" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-2">
                <label htmlFor="username">Username</label>
                <Input
                  type="text"
                  id="username"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />

                <label htmlFor="email">Email Address</label>
                <Input
                  type="email"
                  id="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <label htmlFor="password">Password</label>
                <Input
                  type="password"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <label htmlFor="password2">Confirm Password</label>
                <Input
                  type="password"
                  id="password2"
                  placeholder="Confirm Password"
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                  required
                />
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <Button
                type="submit"
                className="font-medium cursor-pointer"
                variant="outline"
              >
                {isLoading ? <LoaderCircle className="mr-2 h-4 w-4 animate-spin" /> : <LogIn className="mr-2 h-4 w-4" /> } Register
              </Button>
            </form>

            <div className="flex flex-row justify-between text-sm opacity-70">
              <p>Do you have an account?</p>
              <Link href="/login" className="underline">
                Log in
              </Link>
            </div>
      </div>
    </div>
  );
}
