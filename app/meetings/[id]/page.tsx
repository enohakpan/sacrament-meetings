import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { ReactElement } from 'react';

import { MeetingDetail } from '@/components/MeetingDetail';
import type { SacramentMeeting } from '@/lib/types';

export const dynamic = 'force-dynamic';

async function getMeeting(id: string): Promise<SacramentMeeting> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';
  const response = await fetch(`${baseUrl}/api/meetings/${id}`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    if (response.status === 404) {
      notFound();
    }
    throw new Error('Failed to load the meeting detail from the API.');
  }

  return (await response.json()) as SacramentMeeting;
}

export default async function MeetingPage({ params }: { params: Promise<{ id: string }> }): Promise<ReactElement> {
  const { id } = await params;
  const meeting = await getMeeting(id);

  return (
    <main className="space-y-6">
      <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
        <Link href="/meetings" className="font-medium text-sky-700 hover:text-sky-800">
          All meetings
        </Link>
        <span>/</span>
        <span>Meeting #{meeting.id}</span>
      </div>
      <MeetingDetail meeting={meeting} />
    </main>
  );
}
