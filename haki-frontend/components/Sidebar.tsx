"use client";

import { IconPlus, IconAlertTriangle } from "@tabler/icons-react";

interface SidebarProps {
  onNewQuestion: () => void;
}

export default function Sidebar({ onNewQuestion }: SidebarProps) {
  const recentItems = [
    "Police roadblock bribery",
    "Arrested without reason",
    "Detained overnight",
    "Officer beat me",
  ];

  return (
    <aside className="fixed left-0 top-0 w-56 h-screen bg-haki-bg border-r border-white/8 flex flex-col p-4 overflow-y-auto">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-8">
        <div className="w-3 h-3 rounded-full bg-haki-green-light" />
        <h1 className="text-xl font-serif font-bold text-haki-green-light">Haki</h1>
      </div>

      {/* New Question Button */}
      <button
        onClick={onNewQuestion}
        className="w-full flex items-center justify-center gap-2 bg-haki-surface2 hover:bg-haki-surface2/80 text-haki-text px-4 py-2.5 rounded-lg font-medium text-sm transition-colors mb-6 border border-white/8 hover:border-white/12"
      >
        <IconPlus size={18} />
        New question
      </button>

      {/* Recent Section */}
      <div className="mb-6">
        <p className="text-haki-dim text-[11px] font-bold uppercase tracking-wider mb-3">
          Recent
        </p>
        <div className="space-y-2">
          {recentItems.map((item, idx) => (
            <button
              key={idx}
              className="w-full text-left text-haki-muted text-sm px-3 py-2 rounded hover:bg-haki-surface2/50 transition-colors truncate hover:text-haki-text"
              title={item}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Bottom Nav */}
      <div className="space-y-2 mb-4 pb-4 border-b border-white/8">
        <button className="w-full text-left text-haki-muted text-sm px-3 py-2 rounded hover:text-haki-text hover:bg-haki-surface2/50 transition-colors">
          About Haki
        </button>
        <button className="w-full text-left text-haki-muted text-sm px-3 py-2 rounded hover:text-haki-text hover:bg-haki-surface2/50 transition-colors">
          Laws used
        </button>
      </div>

      {/* Emergency Pill */}
      <div className="bg-haki-green/20 border border-haki-green/30 rounded-xl p-4">
        <div className="flex items-start gap-2 mb-3">
          <IconAlertTriangle size={18} className="text-haki-green-light mt-0.5 shrink-0" />
          <p className="font-bold text-haki-green-light text-sm">Emergency</p>
        </div>
        <div className="space-y-1 text-xs text-haki-muted font-medium">
          <p>🚨 <span className="text-haki-text">999</span></p>
          <p>📞 <span className="text-haki-text">IPOA 0800 720 990</span></p>
          <p>⚖️ <span className="text-haki-text">Legal Aid 0800 720 903</span></p>
        </div>
      </div>
    </aside>
  );
}
