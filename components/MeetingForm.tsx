'use client';

import Link from 'next/link';
import { useActionState, useEffect, useState } from 'react';
import type { ReactElement, ReactNode } from 'react';

import type { MeetingActionState, MeetingFormFieldValues } from '@/lib/action-state';
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

interface MeetingFormProps {
  action: MeetingFormAction;
  submitLabel: string;
  defaults?: Partial<MeetingFormDefaults>;
}

function toFieldValues(
  defaults?: Partial<MeetingFormDefaults>,
  submitted?: MeetingFormFieldValues,
): MeetingFormFieldValues {
  return {
    date: submitted?.date ?? defaults?.date ?? '',
    meetingType: submitted?.meetingType ?? defaults?.meetingType ?? 'regular',
    presiding: submitted?.presiding ?? defaults?.presiding ?? '',
    conducting: submitted?.conducting ?? defaults?.conducting ?? '',
    openingPrayer: submitted?.openingPrayer ?? defaults?.openingPrayer ?? '',
    closingPrayer: submitted?.closingPrayer ?? defaults?.closingPrayer ?? '',
    openingHymnNumber: submitted?.openingHymnNumber ?? (defaults?.openingHymnNumber ? String(defaults.openingHymnNumber) : ''),
    openingHymnTitle: submitted?.openingHymnTitle ?? defaults?.openingHymnTitle ?? '',
    sacramentHymnNumber:
      submitted?.sacramentHymnNumber ?? (defaults?.sacramentHymnNumber ? String(defaults.sacramentHymnNumber) : ''),
    sacramentHymnTitle: submitted?.sacramentHymnTitle ?? defaults?.sacramentHymnTitle ?? '',
    closingHymnNumber: submitted?.closingHymnNumber ?? (defaults?.closingHymnNumber ? String(defaults.closingHymnNumber) : ''),
    closingHymnTitle: submitted?.closingHymnTitle ?? defaults?.closingHymnTitle ?? '',
    announcements: submitted?.announcements ?? defaults?.announcements ?? '',
    wardBusiness: submitted?.wardBusiness ?? defaults?.wardBusiness ?? '',
    speakers: submitted?.speakers ?? defaults?.speakers ?? '',
    stakeBusiness: submitted?.stakeBusiness ?? defaults?.stakeBusiness ?? false,
  };
}

function FieldLabel({
  htmlFor,
  required,
  children,
}: {
  htmlFor: string;
  required?: boolean;
  children: ReactNode;
}): ReactElement {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-slate-800">
      {children}
      {required ? (
        <span className="ml-0.5 text-rose-700" aria-hidden="true">
          *
        </span>
      ) : null}
    </label>
  );
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
  const [values, setValues] = useState<MeetingFormFieldValues>(() => toFieldValues(defaults, state.values));

  useEffect(() => {
    if (state.values) {
      setValues(toFieldValues(defaults, state.values));
    }
  }, [defaults, state.values]);

  const updateField = (name: keyof Omit<MeetingFormFieldValues, 'stakeBusiness'>, value: string) => {
    setValues((current) => ({ ...current, [name]: value }));
  };

  return (
    <form action={formAction} className="space-y-5">
      <p className="text-sm text-slate-600">
        Fields marked with <span className="font-semibold text-rose-700">*</span> are required.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <FieldLabel htmlFor="date" required>
            Date
          </FieldLabel>
          <input
            id="date"
            name="date"
            type="date"
            value={values.date}
            onChange={(event) => updateField('date', event.target.value)}
            aria-required="true"
            aria-describedby="date-error"
            aria-invalid={Boolean(state.errors.date)}
            className={fieldClasses(Boolean(state.errors.date))}
          />
          <ErrorText id="date-error" errors={state.errors.date} />
        </div>

        <div>
          <FieldLabel htmlFor="meetingType" required>
            Meeting type
          </FieldLabel>
          <select
            id="meetingType"
            name="meetingType"
            value={values.meetingType}
            onChange={(event) => updateField('meetingType', event.target.value)}
            aria-required="true"
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
          <FieldLabel htmlFor="presiding" required>
            Presiding
          </FieldLabel>
          <input
            id="presiding"
            name="presiding"
            value={values.presiding}
            onChange={(event) => updateField('presiding', event.target.value)}
            aria-required="true"
            aria-describedby="presiding-error"
            aria-invalid={Boolean(state.errors.presiding)}
            className={fieldClasses(Boolean(state.errors.presiding))}
          />
          <ErrorText id="presiding-error" errors={state.errors.presiding} />
        </div>

        <div>
          <FieldLabel htmlFor="conducting" required>
            Conducting
          </FieldLabel>
          <input
            id="conducting"
            name="conducting"
            value={values.conducting}
            onChange={(event) => updateField('conducting', event.target.value)}
            aria-required="true"
            aria-describedby="conducting-error"
            aria-invalid={Boolean(state.errors.conducting)}
            className={fieldClasses(Boolean(state.errors.conducting))}
          />
          <ErrorText id="conducting-error" errors={state.errors.conducting} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <FieldLabel htmlFor="openingHymnNumber" required>
            Opening hymn number
          </FieldLabel>
          <input
            id="openingHymnNumber"
            name="openingHymnNumber"
            type="number"
            value={values.openingHymnNumber}
            onChange={(event) => updateField('openingHymnNumber', event.target.value)}
            aria-required="true"
            aria-describedby="openingHymnNumber-error"
            aria-invalid={Boolean(state.errors.openingHymnNumber)}
            className={fieldClasses(Boolean(state.errors.openingHymnNumber))}
          />
          <ErrorText id="openingHymnNumber-error" errors={state.errors.openingHymnNumber} />
        </div>

        <div>
          <FieldLabel htmlFor="sacramentHymnNumber" required>
            Sacrament hymn number
          </FieldLabel>
          <input
            id="sacramentHymnNumber"
            name="sacramentHymnNumber"
            type="number"
            value={values.sacramentHymnNumber}
            onChange={(event) => updateField('sacramentHymnNumber', event.target.value)}
            aria-required="true"
            aria-describedby="sacramentHymnNumber-error"
            aria-invalid={Boolean(state.errors.sacramentHymnNumber)}
            className={fieldClasses(Boolean(state.errors.sacramentHymnNumber))}
          />
          <ErrorText id="sacramentHymnNumber-error" errors={state.errors.sacramentHymnNumber} />
        </div>

        <div>
          <FieldLabel htmlFor="closingHymnNumber" required>
            Closing hymn number
          </FieldLabel>
          <input
            id="closingHymnNumber"
            name="closingHymnNumber"
            type="number"
            value={values.closingHymnNumber}
            onChange={(event) => updateField('closingHymnNumber', event.target.value)}
            aria-required="true"
            aria-describedby="closingHymnNumber-error"
            aria-invalid={Boolean(state.errors.closingHymnNumber)}
            className={fieldClasses(Boolean(state.errors.closingHymnNumber))}
          />
          <ErrorText id="closingHymnNumber-error" errors={state.errors.closingHymnNumber} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <FieldLabel htmlFor="openingHymnTitle" required>
            Opening hymn title
          </FieldLabel>
          <input
            id="openingHymnTitle"
            name="openingHymnTitle"
            value={values.openingHymnTitle}
            onChange={(event) => updateField('openingHymnTitle', event.target.value)}
            aria-required="true"
            aria-describedby="openingHymnTitle-error"
            aria-invalid={Boolean(state.errors.openingHymnTitle)}
            className={fieldClasses(Boolean(state.errors.openingHymnTitle))}
          />
          <ErrorText id="openingHymnTitle-error" errors={state.errors.openingHymnTitle} />
        </div>

        <div>
          <FieldLabel htmlFor="sacramentHymnTitle" required>
            Sacrament hymn title
          </FieldLabel>
          <input
            id="sacramentHymnTitle"
            name="sacramentHymnTitle"
            value={values.sacramentHymnTitle}
            onChange={(event) => updateField('sacramentHymnTitle', event.target.value)}
            aria-required="true"
            aria-describedby="sacramentHymnTitle-error"
            aria-invalid={Boolean(state.errors.sacramentHymnTitle)}
            className={fieldClasses(Boolean(state.errors.sacramentHymnTitle))}
          />
          <ErrorText id="sacramentHymnTitle-error" errors={state.errors.sacramentHymnTitle} />
        </div>

        <div>
          <FieldLabel htmlFor="closingHymnTitle" required>
            Closing hymn title
          </FieldLabel>
          <input
            id="closingHymnTitle"
            name="closingHymnTitle"
            value={values.closingHymnTitle}
            onChange={(event) => updateField('closingHymnTitle', event.target.value)}
            aria-required="true"
            aria-describedby="closingHymnTitle-error"
            aria-invalid={Boolean(state.errors.closingHymnTitle)}
            className={fieldClasses(Boolean(state.errors.closingHymnTitle))}
          />
          <ErrorText id="closingHymnTitle-error" errors={state.errors.closingHymnTitle} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <FieldLabel htmlFor="openingPrayer" required>
            Opening prayer
          </FieldLabel>
          <input
            id="openingPrayer"
            name="openingPrayer"
            value={values.openingPrayer}
            onChange={(event) => updateField('openingPrayer', event.target.value)}
            aria-required="true"
            aria-describedby="openingPrayer-error"
            aria-invalid={Boolean(state.errors.openingPrayer)}
            className={fieldClasses(Boolean(state.errors.openingPrayer))}
          />
          <ErrorText id="openingPrayer-error" errors={state.errors.openingPrayer} />
        </div>

        <div>
          <FieldLabel htmlFor="closingPrayer" required>
            Closing prayer
          </FieldLabel>
          <input
            id="closingPrayer"
            name="closingPrayer"
            value={values.closingPrayer}
            onChange={(event) => updateField('closingPrayer', event.target.value)}
            aria-required="true"
            aria-describedby="closingPrayer-error"
            aria-invalid={Boolean(state.errors.closingPrayer)}
            className={fieldClasses(Boolean(state.errors.closingPrayer))}
          />
          <ErrorText id="closingPrayer-error" errors={state.errors.closingPrayer} />
        </div>
      </div>

      <div>
        <FieldLabel htmlFor="announcements">Announcements (one per line)</FieldLabel>
        <textarea
          id="announcements"
          name="announcements"
          value={values.announcements}
          onChange={(event) => updateField('announcements', event.target.value)}
          rows={3}
          aria-describedby="announcements-error"
          aria-invalid={Boolean(state.errors.announcements)}
          className={fieldClasses(Boolean(state.errors.announcements))}
        />
        <ErrorText id="announcements-error" errors={state.errors.announcements} />
      </div>

      <div>
        <FieldLabel htmlFor="wardBusiness">Ward business (one per line)</FieldLabel>
        <textarea
          id="wardBusiness"
          name="wardBusiness"
          value={values.wardBusiness}
          onChange={(event) => updateField('wardBusiness', event.target.value)}
          rows={3}
          aria-describedby="wardBusiness-error"
          aria-invalid={Boolean(state.errors.wardBusiness)}
          className={fieldClasses(Boolean(state.errors.wardBusiness))}
        />
        <ErrorText id="wardBusiness-error" errors={state.errors.wardBusiness} />
      </div>

      <div>
        <FieldLabel htmlFor="speakers">Speakers (name|topic|type, one per line)</FieldLabel>
        <textarea
          id="speakers"
          name="speakers"
          value={values.speakers}
          onChange={(event) => updateField('speakers', event.target.value)}
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
            checked={values.stakeBusiness}
            onChange={(event) => setValues((current) => ({ ...current, stakeBusiness: event.target.checked }))}
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
        <Link
          href="/meetings"
          className="inline-flex rounded-full border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
        >
          Cancel
        </Link>
        <p role="status" aria-live="polite" className="text-sm text-rose-700">
          {state.message}
        </p>
      </div>
    </form>
  );
}
