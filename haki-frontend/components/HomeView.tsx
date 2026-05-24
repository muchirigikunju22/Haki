"use client";

import {
  IconCar,
  IconLock,
  IconMoon,
  IconAlertTriangle,
  IconCheck,
} from "@tabler/icons-react";
import InputBar from "./InputBar";

interface HomeViewProps {
  onScenarioSelect: (scenario: string) => void;
  inputValue: string;
  onInputChange: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export default function HomeView({
  onScenarioSelect,
  inputValue,
  onInputChange,
  onSubmit,
  isLoading,
}: HomeViewProps) {
  const scenarios = [
    {
      id: "1",
      text: "Police officer at a roadblock is demanding 500 shillings or he will arrest me",
      icon: IconCar,
    },
    {
      id: "2",
      text: "I have been arrested but no one has told me why or what I am charged with",
      icon: IconLock,
    },
    {
      id: "3",
      text: "Police are holding me overnight and refusing to let me call a lawyer or my family",
      icon: IconMoon,
    },
    {
      id: "4",
      text: "A police officer beat me during my arrest and I have injuries",
      icon: IconAlertTriangle,
    },
  ];

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
      {/* Heading */}
      <h2 className="text-5xl font-serif font-bold text-center mb-3 max-w-2xl">
        Know your{" "}
        <span className="italic text-haki-green-light">rights.</span>
      </h2>

      {/* Subheading */}
      <p className="text-haki-muted text-center mb-12 max-w-sm text-sm">
        Describe your situation. Get plain-language legal guidance grounded in
        the Kenya Constitution and Kenyan law.
      </p>

      {/* Scenario Grid (2x2) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl mb-12">
        {scenarios.map((scenario) => {
          const Icon = scenario.icon;
          return (
            <button
              key={scenario.id}
              onClick={() => onScenarioSelect(scenario.text)}
              className="group bg-haki-surface border border-white/8 hover:border-haki-green/40 rounded-lg p-4 text-left transition-all hover:bg-haki-surface/50"
            >
              <div className="flex items-start gap-3">
                <div className="shrink-0 w-8 h-8 rounded-md bg-haki-green/15 group-hover:bg-haki-green/25 flex items-center justify-center transition-colors">
                  <Icon
                    size={20}
                    className="text-haki-green-light"
                  />
                </div>
                <p className="text-sm text-haki-muted group-hover:text-haki-text transition-colors leading-snug">
                  {scenario.text}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Trust Bar */}
      <div className="text-center mb-6">
        <p className="text-xs text-haki-dim mb-3">Grounded in Kenyan law</p>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs text-haki-dim">
          <div className="flex items-center gap-1">
            <IconCheck size={14} className="text-haki-green-light" />
            <span>Constitution 2010</span>
          </div>
          <div className="flex items-center gap-1">
            <IconCheck size={14} className="text-haki-green-light" />
            <span>Criminal Procedure Code</span>
          </div>
          <div className="flex items-center gap-1">
            <IconCheck size={14} className="text-haki-green-light" />
            <span>Traffic Act</span>
          </div>
          <div className="flex items-center gap-1">
            <IconCheck size={14} className="text-haki-green-light" />
            <span>IPOA Act</span>
          </div>
        </div>
      </div>

      {/* Input Bar - integrated into home view */}
      <InputBar
        value={inputValue}
        onChange={onInputChange}
        onSubmit={onSubmit}
        isLoading={isLoading}
        isChat={false}
      />
    </div>
  );
}
