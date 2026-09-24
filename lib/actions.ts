'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import type { MeetingActionState, MeetingFormFieldValues } from '@/lib/action-state';
import {
  addMeeting,
  deleteMeeting as deleteMeetingRecord,
  updateMeeting as updateMeetingRecord,
} from '@/lib/meetings-db';
import type { MeetingMutationInput, SpeakerItem, WardBusinessItem } from '@/lib/types';

const MEETING_TYPES = ['testimony', 'regular', 'stake', 'general', 'special'] as const;

const MeetingFormSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date is required.'),
  meetingType: z.enum(MEETING_TYPES),
  presiding: z.string().trim().min(2, 'Presiding name is required.'),
  conducting: z.string().trim().min(2, 'Conducting name is required.'),
  openingPrayer: z.string().trim().min(2, 'Opening prayer name is required.'),
  closingPrayer: z.string().trim().min(2, 'Closing prayer name is required.'),
  openingHymnNumber: z.coerce.number().int().min(1, 'Opening hymn number is required.'),
  openingHymnTitle: z.string().trim().min(2, 'Opening hymn title is required.'),
  sacramentHymnNumber: z.coerce.number().int().min(1, 'Sacrament hymn number is required.'),
  sacramentHymnTitle: z.string().trim().min(2, 'Sacrament hymn title is required.'),
  closingHymnNumber: z.coerce.number().int().min(1, 'Closing hymn number is required.'),
  closingHymnTitle: z.string().trim().min(2, 'Closing hymn title is required.'),
  announcements: z.string().optional(),
  wardBusiness: z.string().optional(),
  speakers: z.string().optional(),
  stakeBusiness: z.boolean(),
});

type MeetingFormValues = z.infer<typeof MeetingFormSchema>;

type MeetingFormFieldErrors = Partial<Record<keyof MeetingFormValues, string[]>>;

function parseLines(value: string | undefined): string[] {
  if (!value) {
    return [];
  }

  return value
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}

function parseWardBusiness(value: string | undefined): WardBusinessItem[] {
  return parseLines(value).map((description) => ({ description }));
}

function parseSpeakers(value: string | undefined): SpeakerItem[] {
  return parseLines(value)
    .map((line) => {
      const [name = '', topic = '', type = 'speaker'] = line.split('|').map((part) => part.trim());
      const normalizedType: SpeakerItem['type'] = type === 'musical-number' ? 'musical-number' : 'speaker';

      if (!name) {
        return null;
      }

      return {
        name,
        topic,
        type: normalizedType,
      } satisfies SpeakerItem;
    })
    .filter((speaker): speaker is SpeakerItem => speaker !== null);
}

function isUniqueDateError(error: unknown): boolean {
  if (!error || typeof error !== 'object') {
    return false;
  }

  const maybeError = error as { code?: string; message?: string };
  const message = maybeError.message?.toLowerCase() ?? '';

  return maybeError.code === '23505' || message.includes('duplicate key') || message.includes('unique constraint');
}

function toMeetingInput(values: MeetingFormValues): MeetingMutationInput {
  return {
    date: values.date,
    meetingType: values.meetingType,
    presiding: values.presiding,
    conducting: values.conducting,
    announcements: parseLines(values.announcements),
    openingHymn: {
      number: values.openingHymnNumber,
      title: values.openingHymnTitle,
    },
    openingPrayer: values.openingPrayer,
    wardBusiness: parseWardBusiness(values.wardBusiness),
    stakeBusiness: values.stakeBusiness,
    sacramentHymn: {
      number: values.sacramentHymnNumber,
      title: values.sacramentHymnTitle,
    },
    speakers: parseSpeakers(values.speakers),
    closingHymn: {
      number: values.closingHymnNumber,
      title: values.closingHymnTitle,
    },
    closingPrayer: values.closingPrayer,
  };
}

function readFormValues(formData: FormData): MeetingFormFieldValues {
  const text = (name: string): string => String(formData.get(name) ?? '');

  return {
    date: text('date'),
    meetingType: text('meetingType') || 'regular',
    presiding: text('presiding'),
    conducting: text('conducting'),
    openingPrayer: text('openingPrayer'),
    closingPrayer: text('closingPrayer'),
    openingHymnNumber: text('openingHymnNumber'),
    openingHymnTitle: text('openingHymnTitle'),
    sacramentHymnNumber: text('sacramentHymnNumber'),
    sacramentHymnTitle: text('sacramentHymnTitle'),
    closingHymnNumber: text('closingHymnNumber'),
    closingHymnTitle: text('closingHymnTitle'),
    announcements: text('announcements'),
    wardBusiness: text('wardBusiness'),
    speakers: text('speakers'),
    stakeBusiness: formData.get('stakeBusiness') === 'on',
  };
}

function validateForm(formData: FormData):
  | { success: true; data: MeetingFormValues; values: MeetingFormFieldValues }
  | { success: false; message: string; errors: MeetingFormFieldErrors; values: MeetingFormFieldValues } {
  const values = readFormValues(formData);
  const parsed = MeetingFormSchema.safeParse({
    ...values,
    stakeBusiness: values.stakeBusiness,
  });

  if (!parsed.success) {
    return {
      success: false,
      message: 'Please correct the highlighted fields and try again.',
      errors: parsed.error.flatten().fieldErrors,
      values,
    };
  }

  return {
    success: true,
    data: parsed.data,
    values,
  };
}

export async function createMeeting(
  _prevState: MeetingActionState,
  formData: FormData,
): Promise<MeetingActionState> {
  const validated = validateForm(formData);

  if (!validated.success) {
    return {
      message: validated.message,
      errors: validated.errors,
      values: validated.values,
    };
  }

  try {
    const createdMeeting = await addMeeting(toMeetingInput(validated.data));
    revalidatePath('/meetings', 'layout');
    revalidatePath('/');
    revalidatePath(`/meetings/${createdMeeting.id}`);
  } catch (error) {
    console.error('Failed to create meeting:', error);

    if (isUniqueDateError(error)) {
      return {
        message: 'A meeting already exists on this date.',
        errors: { date: ['Choose a different meeting date.'] },
        values: validated.values,
      };
    }

    throw new Error('Unable to create the meeting right now. Please try again.');
  }

  redirect('/meetings');
}

export async function updateMeeting(
  id: number,
  _prevState: MeetingActionState,
  formData: FormData,
): Promise<MeetingActionState> {
  const validated = validateForm(formData);

  if (!validated.success) {
    return {
      message: validated.message,
      errors: validated.errors,
      values: validated.values,
    };
  }

  try {
    const updatedMeeting = await updateMeetingRecord(id, toMeetingInput(validated.data));

    if (!updatedMeeting) {
      throw new Error('Meeting not found.');
    }

    revalidatePath('/meetings', 'layout');
    revalidatePath('/');
    revalidatePath(`/meetings/${id}`);
  } catch (error) {
    console.error(`Failed to update meeting #${id}:`, error);

    if (isUniqueDateError(error)) {
      return {
        message: 'A meeting already exists on this date.',
        errors: { date: ['Choose a different meeting date.'] },
        values: validated.values,
      };
    }

    throw new Error('Unable to update the meeting right now. Please try again.');
  }

  redirect('/meetings');
}

export async function deleteMeeting(formData: FormData): Promise<void> {
  const parsed = z.coerce.number().int().positive().safeParse(formData.get('id'));

  if (!parsed.success) {
    throw new Error('Invalid meeting id for delete request.');
  }

  try {
    const deleted = await deleteMeetingRecord(parsed.data);

    if (!deleted) {
      throw new Error('Meeting not found.');
    }

    revalidatePath('/meetings', 'layout');
    revalidatePath('/');
    revalidatePath(`/meetings/${parsed.data}`);
  } catch (error) {
    console.error(`Failed to delete meeting #${parsed.data}:`, error);
    throw new Error('Unable to delete the meeting right now. Please try again.');
  }

  redirect('/meetings');
}
