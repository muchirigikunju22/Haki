"use client";

import { useRef, useEffect } from "react";
import { IconArrowUp } from "@tabler/icons-react";

interface InputBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  isChat?: boolean;
}

export default function InputBar({
  value,
  onChange,
  onSubmit,
  isLoading,
  isChat = false,
}: InputBarProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (value.trim()) {
        onSubmit();
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 128)}px`;
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.style.height = "auto";
    }
  }, [isChat]);

  useEffect(() => {
    if (!value && textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  }, [value]);

  return (
    <div
      className={`w-full flex flex-col items-center ${
        isChat
          ? "shrink-0 bg-[#0d0d0d] border-t border-white/[0.08] px-3 md:px-6 pt-3 pb-4"
          : "px-4 md:px-6 pt-4 pb-2"
      }`}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="w-full md:max-w-2xl">
  <div className="bg-[#1a1a1a] border border-white/8 hover:border-white/14 focus-within:border-haki-green rounded-xl transition-colors flex items-end gap-3 px-4 py-3">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Describe your situation..."
            rows={1}
            className="flex-1 bg-transparent text-haki-text placeholder-haki-dim text-sm resize-none font-sans focus:outline-none leading-relaxed"
            style={{ maxHeight: "128px", overflowY: "auto" }}
          />
          <button
            onClick={onSubmit}
            disabled={isLoading || !value.trim()}
            className="w-8 h-8 rounded-lg bg-haki-green hover:bg-haki-green/90 disabled:bg-haki-green/30 disabled:cursor-not-allowed flex items-center justify-center transition-colors shrink-0 mb-0.5"
          >
            <IconArrowUp size={16} className="text-white" />
          </button>
        </div>
        <p className="text-center text-[11px] text-haki-dim mt-2">
          Grounded in Kenyan law · Not a substitute for legal advice
        </p>
      </div>
    </div>
  );
}