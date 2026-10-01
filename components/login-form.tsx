'use client';

import { useActionState } from 'react';

import { authenticate } from '@/lib/actions';

export function LoginForm({ redirectTo, urlError }: { redirectTo: string; urlError?: string }) {
  const [errorMessage, formAction, isPending] = useActionState(authenticate, undefined);
  const message = errorMessage ?? urlError;

  return (
    <form action={formAction} className="mt-6 space-y-4">
      <input type="hidden" name="redirectTo" value={redirectTo} />
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-slate-800">
          Email
        </label>
        <input
          id="email"
          type="email"
          name="email"
          autoComplete="email"
          required
          className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none ring-sky-700 focus:ring-2"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-slate-800">
          Password
        </label>
        <input
          id="password"
          type="password"
          name="password"
          autoComplete="current-password"
          minLength={6}
          required
          className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none ring-sky-700 focus:ring-2"
        />
      </div>
      <button
        aria-disabled={isPending}
        disabled={isPending}
        type="submit"
        className="w-full rounded-full bg-sky-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-800 disabled:cursor-wait disabled:opacity-70"
      >
        {isPending ? 'Signing in...' : 'Sign in'}
      </button>
      {message ? (
        <p role="alert" className="text-sm font-medium text-red-700">
          {message}
        </p>
      ) : null}
    </form>
  );
}
