import Link from 'next/link';
import type { ReactElement } from 'react';

import { deleteMeeting } from '@/lib/actions';
import type { SacramentMeeting } from '@/lib/types';

function MeetingMetaBadge({ type, id }: { type: SacramentMeeting['meetingType']; id: number }): ReactElement {
  return (
    <div className="mb-4 flex items-center justify-between gap-3">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">{type}</p>
      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">{id}</span>
    </div>
  );
}

function MeetingHymnSummary({ label, hymn }: { label: string; hymn: SacramentMeeting['openingHymn'] }): ReactElement {
  return (
    <p>
      <span className="font-medium text-slate-900">{label}:</span> {hymn.number} — {hymn.title}
    </p>
  );
}

export function MeetingCard({ meeting }: { meeting: SacramentMeeting }): ReactElement {
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${meeting.date}T12:00:00Z`));

  return (
    <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
      <MeetingMetaBadge type={meeting.meetingType} id={meeting.id} />

      <h2 className="text-xl font-semibold text-slate-900">{formattedDate}</h2>
      <p className="mt-3 text-sm text-slate-600">Presiding: {meeting.presiding}</p>
      <p className="mt-1 text-sm text-slate-600">Conducting: {meeting.conducting}</p>

      <div className="mt-4 space-y-2 text-sm text-slate-700">
        <MeetingHymnSummary label="Opening hymn" hymn={meeting.openingHymn} />
        <MeetingHymnSummary label="Sacrament hymn" hymn={meeting.sacramentHymn} />
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        <Link
          href={`/meetings/${meeting.id}`}
          className="inline-flex w-fit items-center rounded-full bg-sky-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-800"
        >
          View agenda
        </Link>
        <Link
          href={`/meetings/${meeting.id}/edit`}
          className="inline-flex w-fit items-center rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
        >
          Edit
        </Link>
        <form action={deleteMeeting}>
          <input type="hidden" name="id" value={meeting.id} />
          <button
            type="submit"
            aria-label={`Delete meeting on ${formattedDate}`}
            className="inline-flex w-fit items-center rounded-full border border-rose-300 px-4 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-50"
          >
            Delete
          </button>
        </form>
      </div>
    </article>
  );
}
