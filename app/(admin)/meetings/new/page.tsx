import type { ReactElement } from 'react';

import { MeetingForm } from '@/components/MeetingForm';
import { createMeeting } from '@/lib/actions';

export default function CreateMeetingPage(): ReactElement {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-bold text-slate-900">Create meeting</h2>
      <p className="mt-3 text-slate-600">Add a sacrament meeting agenda and publish it to the meetings list.</p>
      <div className="mt-6">
        <MeetingForm action={createMeeting} submitLabel="Create meeting" />
      </div>
    </section>
  );
}
