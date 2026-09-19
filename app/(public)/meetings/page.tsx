import { Suspense } from 'react';
import type { ReactElement } from 'react';

import { MeetingCard } from '@/components/MeetingCard';
import { MeetingSearch } from '@/components/MeetingSearch';
import { Pagination } from '@/components/Pagination';
import { getMeetings } from '@/lib/meetings-db';

function SearchFallback(): ReactElement {
  return (
    <div className="h-10 w-full max-w-md animate-pulse rounded-full bg-slate-200" aria-hidden="true" />
  );
}

export default async function MeetingsPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string | string[]; page?: string | string[] }>;
}): Promise<ReactElement> {
  const params = await searchParams;
  const query = Array.isArray(params.query) ? (params.query[0] ?? '') : (params.query ?? '');
  const pageValue = Array.isArray(params.page) ? params.page[0] : params.page;
  const currentPage = Number(pageValue) || 1;
  const { meetings, totalPages } = await getMeetings(query, currentPage);

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold text-slate-900">Upcoming meetings</h2>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">
            Page {currentPage}
          </span>
        </div>
        <Suspense fallback={<SearchFallback />}>
          <MeetingSearch />
        </Suspense>
      </div>

      {meetings.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-slate-600">
          No meetings match this search.
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {meetings.map((meeting) => (
            <MeetingCard key={meeting.id} meeting={meeting} />
          ))}
        </div>
      )}

      <Suspense fallback={null}>
        <Pagination totalPages={totalPages} />
      </Suspense>
    </div>
  );
}
