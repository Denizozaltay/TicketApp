"use client";

import { useAuth } from "@/src/lib/auth/AuthContext";
import { useState } from "react";

type Props = {
  onSuccess: () => void;
};

export default function TicketFormCard({ onSuccess }: Props) {
  const { userId, username } = useAuth();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!userId || !username) {
      alert("You must be logged in to submit a ticket.");
      return;
    }

    try {
      const response = await fetch("/api/tickets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          title,
          content,
          userId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create ticket");
      }

      setTitle("");
      setContent("");
      onSuccess();
    } catch (error) {
      console.error("Error creating ticket:", error);
      alert("Failed to create ticket. Please try again.");
    }
  }

  return (
    <div className="flex justify-center flex-1 w-[90%] md:w-[45%]">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full md:w-4/5 h-full p-8 md:p-9 gap-5 rounded-[22px] bg-white shadow-lg"
      >
        <p className="mt-2 text-2xl font-light text-black">Personal Info</p>

        {/* Title */}
        <div className="flex flex-col">
          <label
            htmlFor="title"
            className="block mb-1 text-sm font-light text-black"
          >
            Title
          </label>
          <textarea
            id="title"
            rows={1}
            placeholder="e.g. Feature request"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-4/5 text-sm p-2 rounded-md border border-gray-300 bg-gray-50 resize-none focus:outline-none focus:border-gray-400"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col">
          <label
            htmlFor="content"
            className="block mb-1 text-sm font-light text-black"
          >
            Content
          </label>
          <textarea
            id="content"
            rows={8}
            placeholder="I want the feature about..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="text-sm p-2 rounded-md border border-gray-300 bg-gray-50 resize-none focus:outline-none focus:border-gray-400"
          />
        </div>

        {/* Send Button */}
        <div className="flex justify-center pt-4">
          <button
            id="send"
            type="submit"
            className="w-28 h-10 text-sm font-medium rounded-md border border-[#008CFF] bg-[#008CFF] text-white transition-colors duration-300 hover:bg-white hover:text-black"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
