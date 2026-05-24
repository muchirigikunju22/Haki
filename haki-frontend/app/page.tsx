"use client";

import { useState } from "react";
import { Message } from "@/types";
import { getLegalAdvice } from "@/lib/api";
import Sidebar from "@/components/Sidebar";
import HomeView from "@/components/HomeView";
import ChatView from "@/components/ChatView";
import InputBar from "@/components/InputBar";

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [view, setView] = useState<"home" | "chat">("home");

  const handleScenarioSelect = (scenario: string) => {
    setInputValue(scenario);
    setView("chat");
    // Scroll to input bar
    setTimeout(() => {
      const inputBar = document.querySelector("textarea");
      inputBar?.focus();
    }, 0);
  };

  const handleSubmit = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      role: "user",
      content: inputValue,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);
    setView("chat");

    try {
      const response = await getLegalAdvice(inputValue);
      const hakiMessage: Message = {
        role: "haki",
        content: response,
      };
      setMessages((prev) => [...prev, hakiMessage]);
    } catch (err) {
      const errorMsg =
        err instanceof Error
          ? err.message
          : "Service temporarily unavailable. Please call IPOA on 0800 720 990 for help.";
      const errorMessage: Message = {
        role: "haki",
        content: errorMsg,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewQuestion = () => {
    setMessages([]);
    setInputValue("");
    setView("home");
  };

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Sidebar */}
      <Sidebar onNewQuestion={handleNewQuestion} />

      {/* Main Content - flex column that fills remaining space */}
      <div className="flex-1 ml-56 flex flex-col overflow-hidden">
        {/* Views */}
        {view === "home" && (
          <HomeView
            onScenarioSelect={handleScenarioSelect}
            inputValue={inputValue}
            onInputChange={setInputValue}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        )}

        {view === "chat" && (
  <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
    <ChatView messages={messages} isLoading={isLoading} />
    <InputBar
      key="chat-input"
      value={inputValue}
      onChange={setInputValue}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      isChat={true}
    />
  </div>
)}
      </div>
    </div>
  );
}
