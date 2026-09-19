import type { ReactElement } from 'react';

export default async function EditMeetingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<ReactElement> {
  const { id } = await params;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-bold text-slate-900">Edit Meeting — Coming in Week 04</h2>
      <p className="mt-3 text-slate-600">The form to update meeting #{id} will be added next week.</p>
    </section>
  );
}
