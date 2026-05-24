'use client';

import { useState } from 'react';
import { parseAdvice } from '@/lib/parseAdvice';

interface AdviceResultProps {
  advice: string;
  sources: string[];
  disclaimer: string;
  responseTime: number;
  onReset: () => void;
}

interface Section {
  id: string;
  title: string;
  icon: string;
  color: string;
  content: string | string[];
  isList?: boolean;
}

export default function AdviceResult({
  advice,
  sources,
  disclaimer,
  responseTime,
  onReset,
}: AdviceResultProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['rights', 'actionItems']));
  const parsed = parseAdvice(advice);

  const toggleSection = (id: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedSections(newExpanded);
  };

  const sections: Section[] = [
    {
      id: 'rights',
      title: 'Your Rights in This Situation',
      icon: '⚖️',
      color: 'green',
      content: parsed.rights,
    },
    {
      id: 'actionItems',
      title: 'What to Do Right Now',
      icon: '⚡',
      color: 'amber',
      content: parsed.actionItems,
      isList: true,
    },
    {
      id: 'evidence',
      title: 'What Evidence to Preserve',
      icon: '📋',
      color: 'blue',
      content: parsed.evidence,
    },
    {
      id: 'help',
      title: 'Where to Get Help',
      icon: '🤝',
      color: 'purple',
      content: parsed.help,
    },
    {
      id: 'references',
      title: 'Legal References',
      icon: '📚',
      color: 'gray',
      content: parsed.references,
    },
  ].filter((s) => s.content && (typeof s.content === 'string' ? s.content.trim() : s.content.length > 0));

  const colorClasses = {
    green: 'border-green-200 hover:bg-green-50',
    amber: 'border-amber-200 hover:bg-amber-50',
    blue: 'border-blue-200 hover:bg-blue-50',
    purple: 'border-purple-200 hover:bg-purple-50',
    gray: 'border-gray-200 hover:bg-gray-50',
  };

  const shareOnWhatsApp = () => {
    const text = `Check Haki - Know Your Rights in Kenya. Get legal advice grounded in Kenyan law.`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <div className="space-y-4">
      {/* Accordion Sections */}
      {sections.map((section) => (
        <div key={section.id} className={`border ${colorClasses[section.color as keyof typeof colorClasses]} rounded-lg overflow-hidden transition`}>
          <button
            onClick={() => toggleSection(section.id)}
            className="w-full flex items-center justify-between p-4 text-left font-semibold text-gray-900 hover:bg-gray-50 transition"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">{section.icon}</span>
              <span>{section.title}</span>
            </div>
            <span className={`transition transform ${expandedSections.has(section.id) ? 'rotate-180' : ''}`}>▼</span>
          </button>

          {expandedSections.has(section.id) && (
            <div className="border-t border-gray-200 p-4 bg-gray-50 text-gray-700">
              {section.isList && Array.isArray(section.content) ? (
                <ol className="space-y-3">
                  {section.content.map((item, idx) => (
                    <li key={idx} className="flex gap-3">
                      <span className="font-bold text-gray-600 shrink-0">{idx + 1}.</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="leading-relaxed whitespace-pre-wrap text-sm">{section.content}</p>
              )}
              <button
                onClick={() => copyToClipboard(typeof section.content === 'string' ? section.content : section.content.join('\n'))}
                className="mt-3 text-xs text-gray-600 hover:text-gray-900 font-medium"
              >
                📋 Copy to clipboard
              </button>
            </div>
          )}
        </div>
      ))}

      {/* Sources Chips */}
      {sources.length > 0 && (
        <div className="pt-2 flex flex-wrap gap-2 items-center">
          <span className="text-xs font-semibold text-gray-600">Sources:</span>
          {sources.map((source, idx) => (
            <span key={idx} className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
              {source}
            </span>
          ))}
        </div>
      )}

      {/* Response Time */}
      <div className="text-xs text-gray-500 text-center pt-2">✓ Answer generated in {(responseTime / 1000).toFixed(2)} seconds</div>

      {/* Action Buttons */}
      <div className="flex gap-3 flex-col sm:flex-row pt-4">
        <button
          onClick={onReset}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition"
        >
          Ask Another Question
        </button>
        <button
          onClick={shareOnWhatsApp}
          className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg transition"
        >
          📱 Share on WhatsApp
        </button>
      </div>

      {/* Disclaimer */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <p className="text-xs text-amber-900 leading-relaxed">{disclaimer}</p>
      </div>
    </div>
  );
}
