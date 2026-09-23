'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import type { ReactElement } from 'react';

export default function MeetingsErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}): ReactElement {
  useEffect(() => {
    console.error('Meetings route error:', error);
  }, [error]);

  return (
    <section className="rounded-2xl border border-rose-200 bg-rose-50 p-8 text-rose-900">
      <h2 className="text-2xl font-bold">Something went wrong</h2>
      <p className="mt-3">We could not load this meetings page. Please try again.</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="rounded-full bg-rose-700 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-800"
        >
          Try Again
        </button>
        <Link
          href="/meetings"
          className="rounded-full border border-rose-300 px-4 py-2 text-sm font-semibold text-rose-900 hover:bg-rose-100"
        >
          Back to meetings
        </Link>
      </div>
    </section>
  );
}
