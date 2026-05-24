"use client";

import { LegalAdviceResponse } from "@/types";
import AdviceCards from "./AdviceCards";
import { parseAdvice } from "@/lib/parseAdvice";
import { IconBrandWhatsapp } from "@tabler/icons-react";

interface HakiMessageProps {
  content: string | LegalAdviceResponse;
  isError?: boolean;
}

export default function HakiMessage({ content, isError }: HakiMessageProps) {
  const isAdvice = typeof content !== "string";

  if (isError) {
    return (
      <div className="w-full flex gap-3">
        <div className="w-7 h-7 rounded-full bg-red-600 flex items-center justify-center shrink-0 text-white text-xs font-bold">
          !
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-red-400 mb-1">Error</p>
          <p className="text-sm text-gray-400">
            {typeof content === "string" ? content : "An unknown error occurred."}
          </p>
        </div>
      </div>
    );
  }

  if (!isAdvice) {
    return (
      <div className="w-full flex gap-3">
        <div className="w-7 h-7 rounded-full bg-haki-green flex items-center justify-center shrink-0 text-white text-xs font-bold">
          H
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-haki-green-light mb-2">Haki</p>
          <p className="text-sm text-gray-400 leading-relaxed">
            {typeof content === "string" ? content : ""}
          </p>
        </div>
      </div>
    );
  }

  // Type narrowing: now we know content is LegalAdviceResponse
  
  const advice = content as LegalAdviceResponse;
  const parsedAdvice = parseAdvice(advice.advice);

  return (
    <div className="w-full">
      {/* Avatar + Label */}
      <div className="flex gap-3 mb-3">
        <div className="w-7 h-7 rounded-full bg-haki-green flex items-center justify-center shrink-0 text-white text-xs font-bold">
          H
        </div>
        <p className="text-xs font-semibold text-haki-green-light self-center">Haki</p>
      </div>

      {/* Advice Cards */}
      <div className="max-w-2xl">
        
        <AdviceCards advice={parsedAdvice} />

        {/* Sources */}
        {advice.sources && advice.sources.length > 0 && (
          <div className="mt-3 pt-3 border-t border-white/5">
            <div className="flex flex-wrap gap-2">
              {advice.sources.map((source, idx) => (
                <span
                  key={idx}
                  className="border border-haki-green/25 text-haki-green-light px-2 py-1 rounded-full text-xs"
                >
                  {source}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Disclaimer */}
        <p className="text-xs text-gray-600 mt-3">
          Legal information only. Call 999 or IPOA 0800 720 990 if in danger.
        </p>

        {/* Action Buttons */}
        <div className="mt-3 flex gap-3">
          <a
            href={`https://wa.me/?text=I%20just%20got%20my%20rights%20explained%20by%20Haki%3A%20https%3A%2F%2Fhaki.co.ke`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-gray-500 hover:text-gray-300 text-xs transition-colors"
          >
            <IconBrandWhatsapp size={14} />
            Share
          </a>
        </div>
      </div>
    </div>
  );
}