import { redirect } from 'next/navigation';

import { getMeetings } from '@/lib/meetings-db';

export default function CurrentMeetingPage(): never {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const sunday = new Date(today);
  sunday.setDate(today.getDate() - dayOfWeek);

  const isoDate = sunday.toISOString().slice(0, 10);
  const matchingMeeting = getMeetings(isoDate)[0];

  if (!matchingMeeting) {
    redirect('/meetings');
  }

  redirect(`/meetings/${matchingMeeting.id}`);
}
