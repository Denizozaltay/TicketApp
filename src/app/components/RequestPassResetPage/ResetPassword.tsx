"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoaderCircle, Settings } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

type ResetPasswordProps = {
  token: string;
};

export default function ResetPassword({ token }: ResetPasswordProps) {


  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");


  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    // see if passwords are the same and strong enough
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


    // check the token
    try {
      if (!token) {
        throw new Error("Token is required but was not provided.");
      }


      // send the password & token to auth api
      const res = await fetch("/api/auth/forgotpassword/resetpassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Unexpected error.");
      }
      
      // voila
      setSuccess("Try logging in with your new password!")
      setError("");
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setIsLoading(false);
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="flex flex-col gap-10 bg-white w-fit p-10 rounded-lg shadow-lg overflow-hidden border-1 border-solid border-gray-200">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold">Reset your credentials</h1>
          <p className="text-sm font-light">Reset your password</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-80">
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

          <div>
            <label htmlFor="password2">New Password Again</label>
            <Input
              id="password2"
              type="password"
              placeholder="Type your password again..."
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="flex flex-row gap-1 justify-between">
          {success && <p className="text-green-700 text-sm">{success}</p>}
          {success && <Link href="/auth/login" className="underline text-sm text-black opacity-75">Log in</Link>}
          </div>

          <Button
            type="submit"
            className="font-medium cursor-pointer"
            variant="outline"
          >
            {isLoading ? (
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Settings className="mr-2 h-4 w-4" />
            )}
            Change your password
          </Button>
        </form>
      </div>
    </div>
    </>
  );
}



