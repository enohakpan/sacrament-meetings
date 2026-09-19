'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import type { ReactElement } from 'react';

function PaginationLink({
  href,
  label,
  disabled,
}: {
  href: string;
  label: string;
  disabled: boolean;
}): ReactElement {
  if (disabled) {
    return (
      <span
        aria-disabled="true"
        className="rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-medium text-slate-400"
      >
        {label}
      </span>
    );
  }

  return (
    <Link
      href={href}
      className="rounded-full border border-sky-700 bg-white px-4 py-2 text-sm font-semibold text-sky-800 transition hover:bg-sky-50"
    >
      {label}
    </Link>
  );
}

export function Pagination({ totalPages }: { totalPages: number }): ReactElement | null {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  if (totalPages <= 0) {
    return null;
  }

  const createPageURL = (pageNumber: number): string => {
    const params = new URLSearchParams(searchParams);
    params.set('page', String(pageNumber));
    return `${pathname}?${params.toString()}`;
  };

  return (
    <nav aria-label="Pagination" className="mt-8 flex items-center justify-center gap-4">
      <PaginationLink href={createPageURL(currentPage - 1)} label="Previous" disabled={currentPage <= 1} />
      <p className="text-sm font-medium text-slate-700">
        Page <span className="font-semibold text-slate-900">{currentPage}</span> of{' '}
        <span className="font-semibold text-slate-900">{totalPages}</span>
      </p>
      <PaginationLink href={createPageURL(currentPage + 1)} label="Next" disabled={currentPage >= totalPages} />
    </nav>
  );
}
