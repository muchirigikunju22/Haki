'use client';

export default function ErrorState({ error, onRetry }: { error: string; onRetry: () => void }) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-6 sm:p-8 text-center space-y-4">
      <div className="text-5xl">🚨</div>
      <div>
        <h3 className="text-lg font-bold text-red-900 mb-2">Service Temporarily Unavailable</h3>
        <p className="text-red-800 text-sm">
          {error || 'Unable to reach the legal advice service. Please check your connection and try again.'}
        </p>
      </div>
      
      <div className="bg-red-100 border border-red-300 rounded-lg p-4 my-4">
        <p className="text-sm font-semibold text-red-900 mb-2">For immediate assistance:</p>
        <p className="text-red-800 font-bold text-lg">Call 999 or IPOA: 0800 720 990</p>
      </div>

      <button
        onClick={onRetry}
        className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition"
      >
        Try Again
      </button>
    </div>
  );
}
