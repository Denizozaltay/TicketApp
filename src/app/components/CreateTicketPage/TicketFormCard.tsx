"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/src/lib/auth/AuthContext";
import { LoaderCircle, Send } from "lucide-react";
import { useState } from "react";

type Props = {
  onSuccess: () => void;
};

export default function TicketFormCard({ onSuccess }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { userId, username } = useAuth();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");


  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // check if title or description is empty

    if (title === null || title === ""){
      setError(`Title cannot be empty, please give a title.`)
      setIsLoading(false)
      return;
    }
  
    if (content === null || content === ""){
      setError(`Description cannot be empty, please give a brief description.`)
      setIsLoading(false)
      return;
    }


    // must check if user is authorized

    if (!userId || !username) {
      setIsLoading(false)
      alert("You must be logged in to submit a ticket.");
      return;
    }

    try {
      setIsLoading(true)
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
        setIsLoading(false)
        setError("");
        throw new Error("Failed to create ticket");
        
      }
      setError("");
      setTitle("");
      setContent("");
      onSuccess();
    } catch (error) {
      console.error("Error creating ticket:", error);
      setIsLoading(false)
      alert("Failed to create ticket. Please try again.");
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex justify-center flex-1 w-full p-20">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col h-fit w-[40rem] p-8 gap-5 rounded-[22px] bg-white shadow-lg"
      >
        <p className="mt-2 text-2xl font-medium text-black">Personal Info</p>

        {/* Title */}
        <div className="flex flex-col w-full">
          <label
            htmlFor="title"
            className="block mb-1 text-sm font-light text-black"
          >
            What is it about?
          </label>
          <textarea
            id="title"
            rows={1}
            maxLength={48}
            placeholder="e.g. Feature request"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className=" text-sm p-2 rounded-md border w-[75%] border-gray-300 bg-gray-50 resize-none focus:outline-none focus:border-gray-400"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col w-full">
          <label
            htmlFor="content"
            className="block mb-1 text-sm font-light text-black"
          >
            Description of your request
          </label>
          <textarea
            id="content"
            placeholder="I want the feature about... "
            value={content}
            maxLength={1024}
            onChange={(e) => setContent(e.target.value)}
            className="h-[8rem] text-sm p-2 rounded-md border border-gray-300 bg-gray-50 resize-none focus:outline-none focus:border-gray-400"
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* Send Button */}
          <div className="flex justify-center pt-4">
            <Button
              className="cursor-pointer p-2 font-medium rounded-md border border-[#008CFF] bg-[#008CFF] text-white transition-colors duration-300 hover:bg-white hover:text-black"
              id="send"
              type="submit">
                {isLoading ? <LoaderCircle className="mr-2 h-4 w-4 animate-spin" /> : <Send size={24} />} Send
              </Button>
          </div>
       
      </form>
    </div>
  );
}
