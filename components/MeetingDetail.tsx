import type { ReactElement } from 'react';

import type { SacramentMeeting } from '@/lib/types';

function MeetingHeader({ meeting }: { meeting: SacramentMeeting }): ReactElement {
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${meeting.date}T12:00:00Z`));

  return (
    <header className="mb-6 border-b border-slate-200 pb-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">{meeting.meetingType}</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">{formattedDate}</h1>
        </div>
        <span className="rounded-full bg-sky-50 px-3 py-1 text-sm font-medium text-sky-800">Meeting #{meeting.id}</span>
      </div>
    </header>
  );
}

function DetailField({ label, value }: { label: string; value: string }): ReactElement {
  return (
    <div className="flex justify-between gap-4">
      <dt className="font-medium text-slate-900">{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

function MeetingLeadershipPanel({ meeting }: { meeting: SacramentMeeting }): ReactElement {
  return (
    <div className="space-y-4 rounded-2xl bg-slate-50 p-4">
      <h2 className="text-lg font-semibold text-slate-900">Leadership</h2>
      <dl className="space-y-3 text-sm text-slate-700">
        <DetailField label="Presiding" value={meeting.presiding} />
        <DetailField label="Conducting" value={meeting.conducting} />
        <DetailField label="Opening prayer" value={meeting.openingPrayer} />
        <DetailField label="Closing prayer" value={meeting.closingPrayer} />
      </dl>
    </div>
  );
}

function MeetingHymnPanel({ meeting }: { meeting: SacramentMeeting }): ReactElement {
  return (
    <div className="space-y-4 rounded-2xl bg-slate-50 p-4">
      <h2 className="text-lg font-semibold text-slate-900">Hymns</h2>
      <dl className="space-y-3 text-sm text-slate-700">
        <DetailField label="Opening" value={`#${meeting.openingHymn.number} — ${meeting.openingHymn.title}`} />
        <DetailField label="Sacrament" value={`#${meeting.sacramentHymn.number} — ${meeting.sacramentHymn.title}`} />
        <DetailField label="Closing" value={`#${meeting.closingHymn.number} — ${meeting.closingHymn.title}`} />
      </dl>
    </div>
  );
}

function MeetingBusinessSection({ meeting }: { meeting: SacramentMeeting }): ReactElement {
  return (
    <section className="mt-8 rounded-2xl border border-slate-200 p-4">
      <h2 className="text-lg font-semibold text-slate-900">Ward business</h2>
      {meeting.wardBusiness.length > 0 ? (
        <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-700">
          {meeting.wardBusiness.map((item, index) => (
            <li key={`${item.description}-${index}`}>{item.description}</li>
          ))}
        </ul>
      ) : (
        <p className="mt-3 text-slate-600">No ward business items were announced.</p>
      )}
      <p className="mt-3 text-sm text-slate-600">
        Stake business: <span className="font-medium text-slate-900">{meeting.stakeBusiness ? 'Yes' : 'No'}</span>
      </p>
    </section>
  );
}

function MeetingAnnouncementsSection({ announcements }: { announcements?: string[] }): ReactElement | null {
  if (!announcements || announcements.length === 0) {
    return null;
  }

  return (
    <section className="mt-8 rounded-2xl border border-slate-200 p-4">
      <h2 className="text-lg font-semibold text-slate-900">Announcements</h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-700">
        {announcements.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

function MeetingSpeakerSection({ speakers }: { speakers: SacramentMeeting['speakers'] }): ReactElement {
  return (
    <section className="mt-8 rounded-2xl border border-slate-200 p-4">
      <h2 className="text-lg font-semibold text-slate-900">Speakers</h2>
      <ul className="mt-3 space-y-3 text-slate-700">
        {speakers.map((speaker, index) => (
          <li key={`${speaker.name}-${index}`} className="rounded-xl bg-slate-50 p-3">
            <p className="font-medium text-slate-900">{speaker.name}</p>
            {speaker.type === 'musical-number' ? (
              <p className="text-sm text-slate-600">Musical number</p>
            ) : (
              <p className="text-sm text-slate-600">Topic: {speaker.topic}</p>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function MeetingDetail({ meeting }: { meeting: SacramentMeeting }): ReactElement {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <MeetingHeader meeting={meeting} />

      <div className="grid gap-6 md:grid-cols-2">
        <MeetingLeadershipPanel meeting={meeting} />
        <MeetingHymnPanel meeting={meeting} />
      </div>

      <MeetingBusinessSection meeting={meeting} />
      <MeetingAnnouncementsSection announcements={meeting.announcements} />
      <MeetingSpeakerSection speakers={meeting.speakers} />
    </article>
  );
}
