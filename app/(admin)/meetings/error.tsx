'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function MeetingsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Meetings route error:', error);
  }, [error]);

  return (
    <main className="p-8 text-center">
      <h1 className="mb-4 text-2xl font-bold">Something went wrong</h1>

      <p className="mb-4 text-gray-600">
        We couldn&apos;t complete that meeting request. Please try again.
      </p>

      <button
        type="button"
        onClick={() => reset()}
        className="mb-4 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        Try Again
      </button>

      <div>
        <Link href="/meetings" className="text-blue-600 hover:underline">
          ← Back to meetings
        </Link>
      </div>
    </main>
  );
}