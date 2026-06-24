"use client";

import { useEffect, useRef } from "react";
import { Message } from "@/types";
import UserMessage from "./UserMessage";
import HakiMessage from "./HakiMessage";
import { IconAlertTriangle } from "@tabler/icons-react";

interface ChatViewProps {
  messages: Message[];
  isLoading: boolean;
}

const dangerKeywords = ['beat', 'injured', 'bleeding', 'dying', 'rape', 'abuse', 'gun', 'shot', 'torture', 'emergency', 'dying', 'killed', 'murder', 'strangled', 'burned', 'unconscious'];

export default function ChatView({ messages, isLoading }: ChatViewProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const isDangerousScenario = (content: string): boolean => {
    return dangerKeywords.some(kw => content.toLowerCase().includes(kw));
  };

  return (
    <div className="flex-1 min-h-0 overflow-y-auto px-6 py-8">
      <div className="flex flex-col gap-8 max-w-3xl mx-auto">
        {messages.map((message, idx) => {
          if (message.role === "user") {
            return <UserMessage key={idx} content={message.content as string} />;
          }

          const isDangerous = typeof message.content === 'string' 
            ? isDangerousScenario(message.content) 
            : isDangerousScenario(message.content.advice);

          return (
            <div key={idx} className="w-full">
              {isDangerous && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 mb-4 flex items-center gap-2">
                  <IconAlertTriangle size={16} className="text-red-400 shrink-0" />
                  <span className="text-sm text-red-300 font-medium">
                    This appears urgent. If you are in immediate danger, call <span className="font-bold">999</span> now.
                  </span>
                </div>
              )}
              <HakiMessage content={message.content} isError={false} />
            </div>
          );
        })}

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