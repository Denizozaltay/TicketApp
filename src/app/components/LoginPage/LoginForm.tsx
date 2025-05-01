"use client";

import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { LoaderCircle, LogIn } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, rememberMe }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.message || "Login failed.");
        setIsLoading(false);
        return;
      }

      setError("");
      router.push("/");
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setIsLoading(false);
      console.error("Login error:", err);
    }
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="flex flex-col gap-10 bg-white w-fit p-10 rounded-lg shadow-lg overflow-hidden border-1 border-solid border-gray-200">
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
            <Checkbox
              id="remember"
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(!!checked)}
            />
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
            {isLoading ? (
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <LogIn className="mr-2 h-4 w-4" />
            )}{" "}
            Login
          </Button>
        </form>

        <div className="flex flex-row justify-between text-sm opacity-70">
          <p>Don’t have an account?</p>
          <Link href="/register" className="underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
