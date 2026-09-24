import Link from 'next/link';
import type { ReactElement } from 'react';

export default function MeetingNotFoundPage(): ReactElement {
  return (
    <section className="rounded-2xl border border-amber-200 bg-amber-50 p-8 text-amber-900">
      <h2 className="text-2xl font-bold">Meeting not found</h2>
      <p className="mt-3">The meeting you are looking for does not exist or may have been removed.</p>
      <Link
        href="/meetings"
        className="mt-6 inline-flex rounded-full bg-amber-900 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-950"
      >
        Back to meetings
      </Link>
    </section>
  );
}
