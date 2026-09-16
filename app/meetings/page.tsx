import type { ReactElement } from 'react';

import { MeetingCard } from '@/components/MeetingCard';
import type { SacramentMeeting } from '@/lib/types';

export const dynamic = 'force-dynamic';

async function getMeetings(): Promise<SacramentMeeting[]> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';
  const response = await fetch(`${baseUrl}/api/meetings`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to load meetings from API.');
  }

  return (await response.json()) as SacramentMeeting[];
}

export default async function MeetingsPage(): Promise<ReactElement> {
  const meetings = await getMeetings();

  return (
    <main>
      <div className="mb-6 flex items-center justify-between gap-3">
        <h2 className="text-2xl font-bold text-slate-900">Upcoming meetings</h2>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">
          {meetings.length} records
        </span>
      </div>

      {meetings.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-slate-600">
          No meetings are currently scheduled.
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {meetings.map((meeting) => (
            <MeetingCard key={meeting.id} meeting={meeting} />
          ))}
        </div>
      )}
    </main>
  );
}
