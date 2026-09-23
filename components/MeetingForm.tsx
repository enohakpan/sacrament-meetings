'use client';

import { useActionState } from 'react';
import type { ReactElement } from 'react';

import type { MeetingActionState } from '@/lib/action-state';
import type { MeetingType } from '@/lib/types';

const meetingTypes: MeetingType[] = ['testimony', 'regular', 'stake', 'general', 'special'];

const initialState: MeetingActionState = {
  message: '',
  errors: {},
};

type MeetingFormAction = (state: MeetingActionState, formData: FormData) => Promise<MeetingActionState>;

export interface MeetingFormDefaults {
  date: string;
  meetingType: MeetingType;
  presiding: string;
  conducting: string;
  openingPrayer: string;
  closingPrayer: string;
  openingHymnNumber: number;
  openingHymnTitle: string;
  sacramentHymnNumber: number;
  sacramentHymnTitle: string;
  closingHymnNumber: number;
  closingHymnTitle: string;
  announcements: string;
  wardBusiness: string;
  speakers: string;
  stakeBusiness: boolean;
}

const emptyDefaults: MeetingFormDefaults = {
  date: '',
  meetingType: 'regular',
  presiding: '',
  conducting: '',
  openingPrayer: '',
  closingPrayer: '',
  openingHymnNumber: 0,
  openingHymnTitle: '',
  sacramentHymnNumber: 0,
  sacramentHymnTitle: '',
  closingHymnNumber: 0,
  closingHymnTitle: '',
  announcements: '',
  wardBusiness: '',
  speakers: '',
  stakeBusiness: false,
};

interface MeetingFormProps {
  action: MeetingFormAction;
  submitLabel: string;
  defaults?: Partial<MeetingFormDefaults>;
}

function ErrorText({ id, errors }: { id: string; errors?: string[] }): ReactElement {
  return (
    <p id={id} aria-live="polite" className="mt-1 min-h-5 text-sm text-rose-700">
      {errors?.[0] ?? ''}
    </p>
  );
}

function fieldClasses(hasError: boolean): string {
  return [
    'w-full rounded-lg border px-3 py-2 text-sm text-slate-900',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-600',
    hasError ? 'border-rose-500 bg-rose-50' : 'border-slate-300 bg-white',
  ].join(' ');
}

export function MeetingForm({ action, submitLabel, defaults }: MeetingFormProps): ReactElement {
  const [state, formAction, isPending] = useActionState(action, initialState);
  const formDefaults = { ...emptyDefaults, ...defaults };

  return (
    <form action={formAction} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-slate-800">
            Date
          </label>
          <input
            id="date"
            name="date"
            type="date"
            defaultValue={formDefaults.date}
            aria-describedby="date-error"
            aria-invalid={Boolean(state.errors.date)}
            className={fieldClasses(Boolean(state.errors.date))}
          />
          <ErrorText id="date-error" errors={state.errors.date} />
        </div>

        <div>
          <label htmlFor="meetingType" className="block text-sm font-medium text-slate-800">
            Meeting type
          </label>
          <select
            id="meetingType"
            name="meetingType"
            defaultValue={formDefaults.meetingType}
            aria-describedby="meetingType-error"
            aria-invalid={Boolean(state.errors.meetingType)}
            className={fieldClasses(Boolean(state.errors.meetingType))}
          >
            {meetingTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <ErrorText id="meetingType-error" errors={state.errors.meetingType} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="presiding" className="block text-sm font-medium text-slate-800">
            Presiding
          </label>
          <input
            id="presiding"
            name="presiding"
            defaultValue={formDefaults.presiding}
            aria-describedby="presiding-error"
            aria-invalid={Boolean(state.errors.presiding)}
            className={fieldClasses(Boolean(state.errors.presiding))}
          />
          <ErrorText id="presiding-error" errors={state.errors.presiding} />
        </div>

        <div>
          <label htmlFor="conducting" className="block text-sm font-medium text-slate-800">
            Conducting
          </label>
          <input
            id="conducting"
            name="conducting"
            defaultValue={formDefaults.conducting}
            aria-describedby="conducting-error"
            aria-invalid={Boolean(state.errors.conducting)}
            className={fieldClasses(Boolean(state.errors.conducting))}
          />
          <ErrorText id="conducting-error" errors={state.errors.conducting} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <label htmlFor="openingHymnNumber" className="block text-sm font-medium text-slate-800">
            Opening hymn number
          </label>
          <input
            id="openingHymnNumber"
            name="openingHymnNumber"
            type="number"
            defaultValue={formDefaults.openingHymnNumber || ''}
            aria-describedby="openingHymnNumber-error"
            aria-invalid={Boolean(state.errors.openingHymnNumber)}
            className={fieldClasses(Boolean(state.errors.openingHymnNumber))}
          />
          <ErrorText id="openingHymnNumber-error" errors={state.errors.openingHymnNumber} />
        </div>

        <div>
          <label htmlFor="sacramentHymnNumber" className="block text-sm font-medium text-slate-800">
            Sacrament hymn number
          </label>
          <input
            id="sacramentHymnNumber"
            name="sacramentHymnNumber"
            type="number"
            defaultValue={formDefaults.sacramentHymnNumber || ''}
            aria-describedby="sacramentHymnNumber-error"
            aria-invalid={Boolean(state.errors.sacramentHymnNumber)}
            className={fieldClasses(Boolean(state.errors.sacramentHymnNumber))}
          />
          <ErrorText id="sacramentHymnNumber-error" errors={state.errors.sacramentHymnNumber} />
        </div>

        <div>
          <label htmlFor="closingHymnNumber" className="block text-sm font-medium text-slate-800">
            Closing hymn number
          </label>
          <input
            id="closingHymnNumber"
            name="closingHymnNumber"
            type="number"
            defaultValue={formDefaults.closingHymnNumber || ''}
            aria-describedby="closingHymnNumber-error"
            aria-invalid={Boolean(state.errors.closingHymnNumber)}
            className={fieldClasses(Boolean(state.errors.closingHymnNumber))}
          />
          <ErrorText id="closingHymnNumber-error" errors={state.errors.closingHymnNumber} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <label htmlFor="openingHymnTitle" className="block text-sm font-medium text-slate-800">
            Opening hymn title
          </label>
          <input
            id="openingHymnTitle"
            name="openingHymnTitle"
            defaultValue={formDefaults.openingHymnTitle}
            aria-describedby="openingHymnTitle-error"
            aria-invalid={Boolean(state.errors.openingHymnTitle)}
            className={fieldClasses(Boolean(state.errors.openingHymnTitle))}
          />
          <ErrorText id="openingHymnTitle-error" errors={state.errors.openingHymnTitle} />
        </div>

        <div>
          <label htmlFor="sacramentHymnTitle" className="block text-sm font-medium text-slate-800">
            Sacrament hymn title
          </label>
          <input
            id="sacramentHymnTitle"
            name="sacramentHymnTitle"
            defaultValue={formDefaults.sacramentHymnTitle}
            aria-describedby="sacramentHymnTitle-error"
            aria-invalid={Boolean(state.errors.sacramentHymnTitle)}
            className={fieldClasses(Boolean(state.errors.sacramentHymnTitle))}
          />
          <ErrorText id="sacramentHymnTitle-error" errors={state.errors.sacramentHymnTitle} />
        </div>

        <div>
          <label htmlFor="closingHymnTitle" className="block text-sm font-medium text-slate-800">
            Closing hymn title
          </label>
          <input
            id="closingHymnTitle"
            name="closingHymnTitle"
            defaultValue={formDefaults.closingHymnTitle}
            aria-describedby="closingHymnTitle-error"
            aria-invalid={Boolean(state.errors.closingHymnTitle)}
            className={fieldClasses(Boolean(state.errors.closingHymnTitle))}
          />
          <ErrorText id="closingHymnTitle-error" errors={state.errors.closingHymnTitle} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="openingPrayer" className="block text-sm font-medium text-slate-800">
            Opening prayer
          </label>
          <input
            id="openingPrayer"
            name="openingPrayer"
            defaultValue={formDefaults.openingPrayer}
            aria-describedby="openingPrayer-error"
            aria-invalid={Boolean(state.errors.openingPrayer)}
            className={fieldClasses(Boolean(state.errors.openingPrayer))}
          />
          <ErrorText id="openingPrayer-error" errors={state.errors.openingPrayer} />
        </div>

        <div>
          <label htmlFor="closingPrayer" className="block text-sm font-medium text-slate-800">
            Closing prayer
          </label>
          <input
            id="closingPrayer"
            name="closingPrayer"
            defaultValue={formDefaults.closingPrayer}
            aria-describedby="closingPrayer-error"
            aria-invalid={Boolean(state.errors.closingPrayer)}
            className={fieldClasses(Boolean(state.errors.closingPrayer))}
          />
          <ErrorText id="closingPrayer-error" errors={state.errors.closingPrayer} />
        </div>
      </div>

      <div>
        <label htmlFor="announcements" className="block text-sm font-medium text-slate-800">
          Announcements (one per line)
        </label>
        <textarea
          id="announcements"
          name="announcements"
          defaultValue={formDefaults.announcements}
          rows={3}
          aria-describedby="announcements-error"
          aria-invalid={Boolean(state.errors.announcements)}
          className={fieldClasses(Boolean(state.errors.announcements))}
        />
        <ErrorText id="announcements-error" errors={state.errors.announcements} />
      </div>

      <div>
        <label htmlFor="wardBusiness" className="block text-sm font-medium text-slate-800">
          Ward business (one per line)
        </label>
        <textarea
          id="wardBusiness"
          name="wardBusiness"
          defaultValue={formDefaults.wardBusiness}
          rows={3}
          aria-describedby="wardBusiness-error"
          aria-invalid={Boolean(state.errors.wardBusiness)}
          className={fieldClasses(Boolean(state.errors.wardBusiness))}
        />
        <ErrorText id="wardBusiness-error" errors={state.errors.wardBusiness} />
      </div>

      <div>
        <label htmlFor="speakers" className="block text-sm font-medium text-slate-800">
          Speakers (name|topic|type, one per line)
        </label>
        <textarea
          id="speakers"
          name="speakers"
          defaultValue={formDefaults.speakers}
          rows={4}
          aria-describedby="speakers-help speakers-error"
          aria-invalid={Boolean(state.errors.speakers)}
          className={fieldClasses(Boolean(state.errors.speakers))}
        />
        <p id="speakers-help" className="mt-1 text-xs text-slate-600">
          Type should be speaker or musical-number.
        </p>
        <ErrorText id="speakers-error" errors={state.errors.speakers} />
      </div>

      <div>
        <label htmlFor="stakeBusiness" className="inline-flex items-center gap-2 text-sm font-medium text-slate-800">
          <input
            id="stakeBusiness"
            name="stakeBusiness"
            type="checkbox"
            defaultChecked={formDefaults.stakeBusiness}
            aria-describedby="stakeBusiness-error"
            className="h-4 w-4 rounded border-slate-300 text-sky-700 focus-visible:ring-sky-600"
          />
          Stake business announced
        </label>
        <ErrorText id="stakeBusiness-error" errors={state.errors.stakeBusiness} />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex rounded-full bg-sky-700 px-5 py-2 text-sm font-semibold text-white transition hover:bg-sky-800 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isPending ? 'Saving...' : submitLabel}
        </button>
        <p aria-live="polite" className="text-sm text-rose-700">
          {state.message}
        </p>
      </div>
    </form>
  );
}
