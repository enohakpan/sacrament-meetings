'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type { ReactElement } from 'react';
import { useDebouncedCallback } from 'use-debounce';

export function MeetingSearch(): ReactElement {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');

    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }

    router.push(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <label className="block w-full max-w-md">
      <span className="sr-only">Search meetings</span>
      <input
        type="search"
        name="query"
        placeholder="Search by speaker, presiding, conducting, or type"
        defaultValue={searchParams.get('query') ?? ''}
        onChange={(event) => handleSearch(event.target.value)}
        aria-label="Search meetings"
        className="w-full rounded-full border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm placeholder:text-slate-500 focus:border-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-700/30"
      />
    </label>
  );
}
