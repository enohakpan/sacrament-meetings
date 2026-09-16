import Link from 'next/link';
import type { ReactElement, ReactNode } from 'react';

import { NavLinks } from '@/components/NavLinks';

export default function MeetingsLayout({ children }: { children: ReactNode }): ReactElement {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">Meetings</p>
          <h1 className="mt-1 text-2xl font-bold text-slate-900">Ward meeting agenda</h1>
        </div>
        <NavLinks />
      </div>
      <div className="mb-4 flex items-center gap-3 text-sm text-slate-600">
        <Link href="/" className="font-medium text-sky-700 hover:text-sky-800">
          Home
        </Link>
        <span>/</span>
        <span>Meetings</span>
      </div>
      {children}
    </div>
  );
}
