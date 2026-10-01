import type { Metadata } from 'next';
import type { ReactElement } from 'react';

import { LoginForm } from '@/components/login-form';

export const metadata: Metadata = {
  title: 'Sign in',
  description: 'Sign in as the ward owner to create, edit, and delete sacrament meeting agendas.',
};

function safeCallbackUrl(value: string | string[] | undefined): string {
  const raw = Array.isArray(value) ? value[0] : value;

  if (!raw) {
    return '/meetings/new';
  }

  if (raw.startsWith('/') && !raw.startsWith('//')) {
    return raw;
  }

  try {
    const url = new URL(raw);

    if (url.pathname.startsWith('/')) {
      return `${url.pathname}${url.search}`;
    }
  } catch {
    return '/meetings/new';
  }

  return '/meetings/new';
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string | string[]; error?: string | string[] }>;
}): Promise<ReactElement> {
  const params = await searchParams;
  const error = Array.isArray(params.error) ? params.error[0] : params.error;
  const urlError = error === 'CredentialsSignin' ? 'Invalid email or password.' : undefined;

  return (
    <div className="mx-auto flex w-full max-w-md px-4 py-16">
      <section className="w-full rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">Leader tools</p>
        <h1 className="mt-2 text-2xl font-bold text-slate-900">Sign in</h1>
        <p className="mt-2 text-sm text-slate-600">
          The ward owner account can manage sacrament meeting agendas. Everyone else can still browse the public schedule.
        </p>
        <LoginForm redirectTo={safeCallbackUrl(params.callbackUrl)} urlError={urlError} />
      </section>
    </div>
  );
}
