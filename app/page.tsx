import Link from 'next/link';
import type { ReactElement } from 'react';

import { HeroSlider } from '@/components/HeroSlider';
import { getCurrentSundayMeeting } from '@/lib/meetings-db';

export default function HomePage(): ReactElement {
  const currentSundayMeeting = getCurrentSundayMeeting();

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="grid items-center gap-8 overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:grid-cols-[1.15fr_0.85fr] lg:p-10">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-700">Weekly worship</p>
          <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Sunday worship at a glance.
          </h1>
          <p className="mt-4 max-w-xl text-lg leading-8 text-slate-600">
            Review the upcoming sacrament meetings, hymn numbers, speakers, and meeting agenda in one easy-to-read format.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/meetings" className="rounded-full bg-sky-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-800">
              Explore meetings
            </Link>
            <Link href={currentSundayMeeting ? `/meetings/${currentSundayMeeting.id}` : '/meetings/current'} className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition hover:border-slate-400 hover:bg-slate-50">
              View this Sunday
            </Link>
          </div>
        </div>

        <HeroSlider />
      </section>

      <section className="mt-10 grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">Meetings</p>
          <h2 className="mt-3 text-3xl font-bold text-slate-900">5</h2>
          <p className="mt-2 text-slate-600">Recent sacrament meeting records available in the archive.</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">Current Sunday</p>
          <h2 className="mt-3 text-3xl font-bold text-slate-900">{currentSundayMeeting ? currentSundayMeeting.id : 'N/A'}</h2>
          <p className="mt-2 text-slate-600">Jump directly to the most recent Sunday meeting agenda.</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">Format</p>
          <h2 className="mt-3 text-3xl font-bold text-slate-900">Agenda</h2>
          <p className="mt-2 text-slate-600">View hymns, prayers, business items, and speaker topics in one place.</p>
        </div>
      </section>
    </main>
  );
}
