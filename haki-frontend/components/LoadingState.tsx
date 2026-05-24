'use client';

export default function LoadingState({ stage }: { stage: 'initial' | 'generating' }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 space-y-6">
      <div className="flex gap-2">
        <div className="w-3 h-3 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
        <div className="w-3 h-3 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-3 h-3 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
      </div>
      <div className="text-center">
        <p className="text-lg font-semibold text-gray-900">
          {stage === 'initial' ? '🔍 Finding relevant laws...' : '⚖️ Generating your rights...'}
        </p>
        <p className="text-sm text-gray-500 mt-2">This may take 10-15 seconds</p>
      </div>
    </div>
  );
}
