import { redirect } from 'next/navigation';

import { getCurrentSundayMeeting } from '@/lib/meetings-db';

export const dynamic = 'force-dynamic';

export default async function CurrentMeetingPage() {
  const matchingMeeting = await getCurrentSundayMeeting();

  if (!matchingMeeting) {
    redirect('/meetings');
  }

  redirect(`/meetings/${matchingMeeting.id}`);
}
