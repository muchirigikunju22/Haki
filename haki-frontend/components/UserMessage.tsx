"use client";

interface UserMessageProps {
  content: string;
}

export default function UserMessage({ content }: UserMessageProps) {
  return (
    <div className="w-full flex justify-end">
      <div className="bg-[#2a2a2a] rounded-2xl px-5 py-3 max-w-[85%] md:max-w-md">
        <p className="text-sm text-[#f0f0f0] leading-relaxed">{content}</p>
      </div>
    </div>
  );
}