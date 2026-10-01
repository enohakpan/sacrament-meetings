import Link from 'next/link';
import { redirect } from 'next/navigation';
import type { ReactElement, ReactNode } from 'react';

import { auth } from '@/auth';
import { SignOutButton } from '@/components/sign-out-button';

export default async function AdminLayout({ children }: { children: ReactNode }): Promise<ReactElement> {
  const session = await auth();

  if (!session?.user) {
    redirect('/login');
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">Leader tools</p>
            <h1 className="mt-1 text-2xl font-bold text-slate-900">Admin</h1>
            <p className="mt-2 text-sm text-slate-600">
              Signed in as {session.user.name ?? session.user.email}. Meeting changes stay limited to this owner account.
            </p>
          </div>
          <SignOutButton />
        </div>
        <nav aria-label="Admin navigation" className="mt-4 flex flex-wrap gap-3 text-sm">
          <Link href="/meetings" className="font-medium text-sky-700 hover:text-sky-800">
            All meetings
          </Link>
          <Link href="/meetings/new" className="font-medium text-sky-700 hover:text-sky-800">
            Create meeting
          </Link>
        </nav>
      </div>
      {children}
    </div>
  );
}
