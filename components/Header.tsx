import Link from 'next/link';
import type { ReactElement } from 'react';

export function Header(): ReactElement {
  const currentDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date());

  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-700">Sacrament Meetings</p>
          <Link href="/" className="text-2xl font-bold text-slate-900 transition hover:text-sky-700">
            GRA Ward
          </Link>
        </div>
        <div className="rounded-full border border-sky-200 bg-sky-50 px-4 py-2 text-sm font-medium text-slate-700">
          {currentDate}
        </div>
      </div>
    </header>
  );
}
