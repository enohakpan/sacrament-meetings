import { redirect } from 'next/navigation';

import { getCurrentSundayMeeting } from '@/lib/meetings-db';

export const dynamic = 'force-dynamic';

export default function CurrentMeetingPage(): never {
  const matchingMeeting = getCurrentSundayMeeting();

  if (!matchingMeeting) {
    redirect('/meetings');
  }

  redirect(`/meetings/${matchingMeeting.id}`);
}
