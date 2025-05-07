"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoaderCircle, Settings } from "lucide-react";

import { useState } from "react";

export default function RequestPasswordReset() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/forgotpassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.message || "Request Failed");
        setSuccess("")
        setIsLoading(false);
        return;
      }

      setSuccess("Password reset instructions has been sent to your email.")
      setError("");
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setSuccess("")
      setIsLoading(false);
      console.error("Request Error:", err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="flex flex-col gap-10 bg-white w-fit p-10 rounded-lg shadow-lg overflow-hidden border-1 border-solid border-gray-200">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold">Reset your credentials</h1>
          <p className="text-sm font-light">Reset password with your Email</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-80">
          <div>
            <label htmlFor="email">E-mail Address</label>
            <Input
              id="email"
              type="email"
              placeholder="E-mail Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-700 text-sm">{success}</p>}

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
            Send Password Reset Request
          </Button>
        </form>
      </div>
    </div>
  );
}
