import type { ReactElement } from 'react';

export default function MeetingsLoading(): ReactElement {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="animate-pulse space-y-4">
        <div className="h-4 w-24 rounded bg-slate-200" />
        <div className="h-8 w-1/2 rounded bg-slate-200" />
        <div className="grid gap-4 md:grid-cols-2">
          <div className="h-48 rounded-xl bg-slate-200" />
          <div className="h-48 rounded-xl bg-slate-200" />
        </div>
      </div>
    </div>
  );
}
