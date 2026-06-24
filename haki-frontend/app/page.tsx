"use client";

import { useState, useEffect } from "react";
import { Message } from "@/types";
import { getLegalAdvice } from "@/lib/api";
import Sidebar from "@/components/Sidebar";
import HomeView from "@/components/HomeView";
import ChatView from "@/components/ChatView";
import InputBar from "@/components/InputBar";

// Generate a random session ID
function generateSessionId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [view, setView] = useState<"home" | "chat">("home");
  const [history, setHistory] = useState<string[]>([]);
  const [modal, setModal] = useState<"about" | "laws" | null>(null);
  
  // Session management
  const [sessionId, setSessionId] = useState<string>("");
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);

  // Initialize session on mount
  useEffect(() => {
    const initializeSession = async () => {
      const savedMode = localStorage.getItem("haki_mode");
      const savedSessionId = localStorage.getItem("haki_session_id");
      
      if (savedMode === "anonymous") {
        setIsAnonymous(true);
      } else {
        // Session mode
        if (savedSessionId) {
          setSessionId(savedSessionId);
          // Load history for this session
          const savedHistory = localStorage.getItem(`haki_history_${savedSessionId}`);
          if (savedHistory) {
            setHistory(JSON.parse(savedHistory));
          }
        } else {
          // Create new session
          const newSessionId = generateSessionId();
          setSessionId(newSessionId);
          localStorage.setItem("haki_session_id", newSessionId);
        }
      }
    };
    
    initializeSession();
  }, []);

  const toggleMode = () => {
    if (isAnonymous) {
      // Switch to session mode
      const newSessionId = generateSessionId();
      setSessionId(newSessionId);
      localStorage.setItem("haki_session_id", newSessionId);
      localStorage.setItem("haki_mode", "session");
      setIsAnonymous(false);
      setHistory([]);
    } else {
      // Switch to anonymous mode
      localStorage.setItem("haki_mode", "anonymous");
      localStorage.removeItem("haki_session_id");
      setIsAnonymous(true);
      setHistory([]);
      setMessages([]);
      setView("home");
    }
  };

  const clearSession = () => {
    if (sessionId) {
      localStorage.removeItem(`haki_history_${sessionId}`);
    }
    setHistory([]);
    setMessages([]);
    setView("home");
  };

  const saveToHistory = (scenario: string) => {
    if (isAnonymous) return; // Don't save in anonymous mode
    
    const trimmed = scenario.length > 40 ? scenario.slice(0, 40) + "..." : scenario;
    setHistory((prev) => {
      const updated = [trimmed, ...prev.filter((h) => h !== trimmed)].slice(0, 8);
      if (sessionId) {
        localStorage.setItem(`haki_history_${sessionId}`, JSON.stringify(updated));
      }
      return updated;
    });
  };

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

    const scenario = inputValue;
    const userMessage: Message = { role: "user", content: scenario };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);
    setView("chat");
    saveToHistory(scenario);

    try {
      const response = await getLegalAdvice(scenario);
      const hakiMessage: Message = { role: "haki", content: response };
      setMessages((prev) => [...prev, hakiMessage]);
    } catch (err) {
      const errorMsg =
        err instanceof Error
          ? err.message
          : "Service temporarily unavailable. Please call IPOA on 0800 720 990 for help.";
      setMessages((prev) => [...prev, { role: "haki", content: errorMsg }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewQuestion = () => {
    setMessages([]);
    setInputValue("");
    setView("home");
  };

  const handleHistoryClick = (item: string) => {
    setInputValue(item.replace("...", ""));
    setView("chat");
  };

  return (
    <div className="h-screen flex overflow-hidden">
      <Sidebar
        onNewQuestion={handleNewQuestion}
        history={history}
        onHistoryClick={handleHistoryClick}
        onAbout={() => setModal("about")}
        onLaws={() => setModal("laws")}
        isAnonymous={isAnonymous}
        onToggleMode={toggleMode}
        onClearSession={clearSession}
      />

      <div className="flex-1 md:ml-56 flex flex-col overflow-hidden">
        {/* Views */}
        {view === "home" && (
          <HomeView
            onScenarioSelect={handleScenarioSelect}
            inputValue={inputValue}
            onInputChange={setInputValue}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            isAnonymous={isAnonymous}
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

      {modal && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
          onClick={() => setModal(null)}
        >
          <div
            className="bg-[#1a1a1a] border border-white/10 rounded-2xl max-w-lg w-full p-6 max-h-[80vh] overflow-y-auto"
            onClick={(event) => event.stopPropagation()}
          >
            {modal === "about" && (
              <>
                <h2 className="text-xl font-serif text-haki-green-light mb-4">About Haki</h2>
                <p className="text-sm text-haki-muted leading-relaxed mb-4">
                  Haki is a legal rights platform for Kenyan citizens. Most people
                  don&apos;t know their rights — not because they don&apos;t care, but because
                  the law is written in complex language that&apos;s hard to understand.
                  Haki bridges that gap.
                </p>
                <p className="text-sm text-haki-muted leading-relaxed mb-4">
                  You describe your situation in plain English or Swahili. Haki
                  searches actual Kenyan legal documents and tells you your rights,
                  what to do right now, what evidence to preserve, and where to get
                  help — citing the specific Act and Section every time.
                </p>
                <div className="bg-[#0d0d0d] rounded-xl p-4 mb-4">
                  <p className="text-xs text-haki-dim font-semibold uppercase tracking-wider mb-2">
                    Current coverage
                  </p>
                  <p className="text-sm text-haki-text">Police encounters and arrests</p>
                  <p className="text-xs text-haki-dim mt-1">
                    Roadblocks · Unlawful arrests · Detention · Police brutality
                  </p>
                </div>
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
                <p className="text-xs text-haki-dim leading-relaxed">
                    Haki provides legal information, not legal advice. It is not a
                    substitute for professional legal representation. Always consult
                    a qualified lawyer for your specific situation.
                  </p>
                </div>
                <div className="mt-4 space-y-2">
                  <p className="text-xs text-haki-dim font-semibold uppercase tracking-wider">Get help</p>
                  <p className="text-sm text-haki-muted">
                    🚨 Emergency: <span className="text-haki-text">999</span>
                  </p>
                  <p className="text-sm text-haki-muted">
                    📞 IPOA: <span className="text-haki-text">0800 720 990</span>
                  </p>
                  <p className="text-sm text-haki-muted">
                    ⚖️ Kituo Cha Sheria: <span className="text-haki-text">0800 720 903</span>
                  </p>
                </div>
              </>
            )}

            {modal === "laws" && (
              <>
                <h2 className="text-xl font-serif text-haki-green-light mb-2">Laws Used</h2>
                <p className="text-sm text-haki-muted mb-5">
                  Hakis answers are grounded strictly in these Kenyan legal documents.
                  Every response cites the specific Act and Section it references.
                </p>
                <div className="space-y-3">
                  {[
                    {
                      name: "Constitution of Kenya 2010",
                      desc: "Articles 49, 50, 51 — arrest rights, fair trial, rights of detained persons",
                    },
                    {
                      name: "Criminal Procedure Code Cap 75",
                      desc: "Lawful arrest procedures, bail, warrants, the 24-hour rule",
                    },
                    {
                      name: "National Police Service Act 2011",
                      desc: "Police conduct, powers, obligations and accountability",
                    },
                    {
                      name: "Traffic Act Cap 403",
                      desc: "Roadblocks, vehicle stops, traffic offences, police powers on roads",
                    },
                    {
                      name: "Penal Code Cap 63",
                      desc: "Criminal offences — what is and isnt illegal under Kenyan law",
                    },
                    {
                      name: "IPOA Act 2011",
                      desc: "How to file complaints against police officers",
                    },
                    {
                      name: "Prevention of Torture Act 2017",
                      desc: "Rights against police brutality and inhumane treatment",
                    },
                  ].map((law, idx) => (
                    <div
                      key={idx}
                      className="bg-[#0d0d0d] border border-white/5 rounded-xl p-4"
                    >
                      <p className="text-sm font-semibold text-haki-text mb-1">{law.name}</p>
                      <p className="text-xs text-haki-dim leading-relaxed">{law.desc}</p>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-haki-dim mt-5 text-center">
                  All documents sourced from{" "}
                  <a
                    href="https://kenyalaw.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-haki-green-light underline"
                  >
                    kenyalaw.org
                  </a>
                </p>
              </>
            )}

            <button
              onClick={() => setModal(null)}
              className="mt-6 w-full py-2.5 rounded-lg border border-white/10 text-sm text-haki-muted hover:text-haki-text hover:bg-white/5 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
