import { notFound } from 'next/navigation';
import type { ReactElement } from 'react';

import type { MeetingFormDefaults } from '@/components/MeetingForm';
import { MeetingForm } from '@/components/MeetingForm';
import { updateMeeting } from '@/lib/actions';
import { getMeetingById } from '@/lib/meetings-db';
import type { SacramentMeeting } from '@/lib/types';

function toFormDefaults(meeting: SacramentMeeting): MeetingFormDefaults {
  return {
    date: meeting.date,
    meetingType: meeting.meetingType,
    presiding: meeting.presiding,
    conducting: meeting.conducting,
    openingPrayer: meeting.openingPrayer,
    closingPrayer: meeting.closingPrayer,
    openingHymnNumber: meeting.openingHymn.number,
    openingHymnTitle: meeting.openingHymn.title,
    sacramentHymnNumber: meeting.sacramentHymn.number,
    sacramentHymnTitle: meeting.sacramentHymn.title,
    closingHymnNumber: meeting.closingHymn.number,
    closingHymnTitle: meeting.closingHymn.title,
    announcements: (meeting.announcements ?? []).join('\n'),
    wardBusiness: meeting.wardBusiness.map((item) => item.description).join('\n'),
    speakers: meeting.speakers.map((speaker) => `${speaker.name}|${speaker.topic}|${speaker.type}`).join('\n'),
    stakeBusiness: meeting.stakeBusiness,
  };
}

export default async function EditMeetingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<ReactElement> {
  const { id } = await params;
  const numericId = Number(id);
  const meeting = Number.isInteger(numericId) ? await getMeetingById(numericId) : null;

  if (!meeting) {
    notFound();
  }

  const updateMeetingWithId = updateMeeting.bind(null, meeting.id);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-bold text-slate-900">Edit meeting #{meeting.id}</h2>
      <p className="mt-3 text-slate-600">Update meeting details and save changes.</p>
      <div className="mt-6">
        <MeetingForm
          key={meeting.id}
          action={updateMeetingWithId}
          submitLabel="Save changes"
          defaults={toFormDefaults(meeting)}
        />
      </div>
    </section>
  );
}
