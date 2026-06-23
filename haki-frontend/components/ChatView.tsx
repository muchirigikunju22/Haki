"use client";

import { useEffect, useRef } from "react";
import { Message } from "@/types";
import UserMessage from "./UserMessage";
import HakiMessage from "./HakiMessage";

interface ChatViewProps {
  messages: Message[];
  isLoading: boolean;
}

export default function ChatView({ messages, isLoading }: ChatViewProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  return (
    <div className="flex-1 min-h-0 overflow-y-auto px-3 md:px-6 py-8">
      <div className="flex flex-col gap-8 max-w-3xl mx-auto">
        {messages.map((message, idx) =>
          message.role === "user" ? (
            <UserMessage key={idx} content={message.content as string} />
          ) : (
            <HakiMessage key={idx} content={message.content} isError={false} />
          )
        )}

        {isLoading && (
          <div className="flex gap-3">
            <div className="w-7 h-7 rounded-full bg-haki-green flex items-center justify-center shrink-0 text-white text-xs font-bold">
              H
            </div>
            <div className="flex items-center gap-1 pt-2">
              <div className="typing-dot w-2 h-2 bg-haki-muted rounded-full" />
              <div className="typing-dot w-2 h-2 bg-haki-muted rounded-full" />
              <div className="typing-dot w-2 h-2 bg-haki-muted rounded-full" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}