import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { ReactElement } from 'react';

import { MeetingDetail } from '@/components/MeetingDetail';
import { getMeetingById } from '@/lib/meetings-db';

export default async function MeetingPage({ params }: { params: Promise<{ id: string }> }): Promise<ReactElement> {
  const { id } = await params;
  const numericId = Number(id);
  const meeting = Number.isInteger(numericId) ? getMeetingById(numericId) : null;

  if (!meeting) {
    notFound();
  }

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
