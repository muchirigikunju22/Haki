"use client";

import {
  IconShield,
  IconBolt,
  IconCamera,
  IconPhoneCall,
  IconBook,
} from "@tabler/icons-react";
import { ParsedAdvice } from "@/types";

interface AdviceCardsProps {
  advice: ParsedAdvice;
}

const sectionConfigs = [
  {
    key: "rights" as const,
    title: "Your Rights in This Situation",
    icon: IconShield,
    iconColor: "text-haki-green-light",
  },
  {
    key: "actionItems" as const,
    title: "What to Do Right Now",
    icon: IconBolt,
    iconColor: "text-amber-300",
  },
  {
    key: "evidence" as const,
    title: "What Evidence to Preserve",
    icon: IconCamera,
    iconColor: "text-blue-300",
  },
  {
    key: "help" as const,
    title: "Where to Get Help",
    icon: IconPhoneCall,
    iconColor: "text-purple-300",
  },
  {
    key: "references" as const,
    title: "Legal References",
    icon: IconBook,
    iconColor: "text-gray-400",
  },
];

export default function AdviceCards({ advice }: AdviceCardsProps) {
  return (
    <div className="space-y-0 w-full max-w-2xl">
      {sectionConfigs.map((config) => {
        const content = advice[config.key];
        if (!content) return null;

        const Icon = config.icon;

        return (
          <div
            key={config.key}
            className={`px-4 py-3 border-b border-white/5 last:border-b-0`}
          >
            {/* Header */}
            <div className="flex items-center gap-2 mb-2">
              <Icon size={16} className={config.iconColor + " opacity-70"} />
              <h3 className="text-sm font-semibold text-gray-200">
                {config.title}
              </h3>
            </div>

            {/* Body */}
            <p className="text-sm text-gray-400 leading-relaxed whitespace-pre-wrap ml-6">
              {content}
            </p>
          </div>
        );
      })}
    </div>
  );
}
