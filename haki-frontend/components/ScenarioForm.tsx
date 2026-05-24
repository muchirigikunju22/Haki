'use client';

import { useState, useRef, useEffect } from 'react';

interface ScenarioFormProps {
  onSubmit: (scenario: string) => void;
  isLoading: boolean;
  onExampleClick: (scenario: string) => void;
}

const EXAMPLES = [
  'Police officer demanding money at roadblock',
  'Arrested but not told why',
  'Detained without access to lawyer',
  'Police officer beat me during arrest',
  'Searched without permission',
];

export default function ScenarioForm({ onSubmit, isLoading, onExampleClick }: ScenarioFormProps) {
  const [scenario, setScenario] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-grow textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [scenario]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (scenario.trim()) {
      onSubmit(scenario);
      setScenario('');
    }
  };

  const handleExampleClick = (example: string) => {
    setScenario(example);
    onExampleClick(example);
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <textarea
            ref={textareaRef}
            value={scenario}
            onChange={(e) => setScenario(e.target.value)}
            placeholder="Describe what is happening to you... e.g., A police officer stopped me at a roadblock"
            className="w-full min-h-12 max-h-48 p-4 border border-gray-300 rounded-xl focus:border-green-600 focus:ring-2 focus:ring-green-100 focus:outline-none resize-none text-gray-900 placeholder-gray-400 transition"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !scenario.trim()}
            className="absolute bottom-3 right-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-2 px-4 rounded-lg transition flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <span className="animate-spin">⏳</span>
                <span className="text-sm">Finding...</span>
              </>
            ) : (
              <>
                <span>→</span>
                <span className="text-sm">Know My Rights</span>
              </>
            )}
          </button>
        </div>

        <p className="text-xs text-gray-500 text-center">This may take 10-15 seconds</p>
      </form>

      <div className="space-y-2">
        <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Quick examples:</p>
        <div className="flex flex-wrap gap-2">
          {EXAMPLES.map((example, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleExampleClick(example)}
              disabled={isLoading}
              className="px-3 py-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 border border-gray-200 rounded-full text-xs text-gray-700 transition whitespace-nowrap"
            >
              {example}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
