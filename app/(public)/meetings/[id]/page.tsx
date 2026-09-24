import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { ReactElement } from 'react';

import { MeetingDetail } from '@/components/MeetingDetail';
import { deleteMeeting } from '@/lib/actions';
import { getMeetingById } from '@/lib/meetings-db';

export default async function MeetingPage({ params }: { params: Promise<{ id: string }> }): Promise<ReactElement> {
  const { id } = await params;
  const numericId = Number(id);
  const meeting = Number.isInteger(numericId) ? await getMeetingById(numericId) : null;

  if (!meeting) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
        <Link href="/meetings" className="font-medium text-sky-700 hover:text-sky-800">
          All meetings
        </Link>
        <span>/</span>
        <span>Meeting #{meeting.id}</span>
        <span className="hidden sm:inline">·</span>
        <Link href={`/meetings/${meeting.id}/edit`} className="font-medium text-sky-700 hover:text-sky-800">
          Edit
        </Link>
        <form action={deleteMeeting}>
          <input type="hidden" name="id" value={meeting.id} />
          <button
            type="submit"
            aria-label={`Delete meeting #${meeting.id}`}
            className="font-medium text-rose-700 hover:text-rose-800"
          >
            Delete
          </button>
        </form>
      </div>
      <MeetingDetail meeting={meeting} />
    </div>
  );
}
