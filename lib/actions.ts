'use server';

import { z } from 'zod';
import {
  addMeeting,
  deleteMeeting as deleteMeetingDb,
  updateMeeting as updateMeetingDb,
} from './meetings-db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import type { SpeakerItem, WardBusinessItem } from './types';

export type State = {
  message: string;
  errors: Record<string, string[]>;
};

const MeetingFormSchema = z.object({
  date: z
    .string()
    .trim()
    .min(1, 'Please choose a meeting date.')
    .pipe(z.iso.date('Please enter a valid date.')),

  meetingType: z.enum(['testimony', 'regular', 'stake', 'general'], {
    error: 'Please choose a meeting type.',
  }),

  presiding: z
    .string()
    .trim()
    .min(1, 'Please enter the person presiding.'),

  conducting: z
    .string()
    .trim()
    .min(1, 'Please enter the person conducting.'),

  openingHymnNumber: z.string().trim().optional(),
  openingHymnTitle: z.string().trim().optional(),
  openingPrayer: z.string().trim().optional(),

  announcements: z.string().optional(),
  wardBusiness: z.string().optional(),
  stakeBusiness: z.string().optional(),

  sacramentHymnNumber: z.string().trim().optional(),
  sacramentHymnTitle: z.string().trim().optional(),

  speakers: z.string().optional(),

  closingHymnNumber: z.string().trim().optional(),
  closingHymnTitle: z.string().trim().optional(),
  closingPrayer: z.string().trim().optional(),
});

type MeetingFormValues = z.infer<typeof MeetingFormSchema>;

function getText(formData: FormData, name: string): string {
  return String(formData.get(name) ?? '').trim();
}

function getAnnouncements(value: string): string[] {
  return value
    .split(/\r?\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function getWardBusiness(value: string): WardBusinessItem[] {
  return value
    .split(/\r?\n|,/)
    .map((description) => description.trim())
    .filter(Boolean)
    .map((description) => ({ description }));
}

function parseHymnNumber(
  value: string,
  fieldName: string
): {
  number?: number;
  errors: Record<string, string[]>;
} {
  if (!value) {
    return {
      number: undefined,
      errors: {},
    };
  }

  const number = Number(value);

  if (!Number.isInteger(number) || number < 1) {
    return {
      number: undefined,
      errors: {
        [fieldName]: ['Enter a whole hymn number greater than 0.'],
      },
    };
  }

  return {
    number,
    errors: {},
  };
}

function parseSpeakers(speakersText: string): {
  speakers: SpeakerItem[];
  errors: Record<string, string[]>;
} {
  if (!speakersText) {
    return {
      speakers: [],
      errors: {},
    };
  }

  try {
    const parsed: unknown = JSON.parse(speakersText);

    if (!Array.isArray(parsed)) {
      return {
        speakers: [],
        errors: {
          speakers: ['Speakers must be a JSON array.'],
        },
      };
    }

    const speakers: SpeakerItem[] = [];

    for (const item of parsed) {
      if (
        typeof item !== 'object' ||
        item === null ||
        !('name' in item) ||
        typeof item.name !== 'string' ||
        !item.name.trim() ||
        !('type' in item) ||
        (item.type !== 'speaker' && item.type !== 'musical-number')
      ) {
        return {
          speakers: [],
          errors: {
            speakers: [
              'Each speaker needs a name and a type of "speaker" or "musical-number".',
            ],
          },
        };
      }

      speakers.push({
        name: item.name.trim(),
        topic:
          'topic' in item && typeof item.topic === 'string'
            ? item.topic.trim()
            : '',
        type: item.type,
      });
    }

    return {
      speakers,
      errors: {},
    };
  } catch {
    return {
      speakers: [],
      errors: {
        speakers: ['Speakers must be valid JSON.'],
      },
    };
  }
}

function buildMeetingData(
  values: MeetingFormValues,
  openingHymnNumber: number | undefined,
  sacramentHymnNumber: number | undefined,
  closingHymnNumber: number | undefined,
  speakers: SpeakerItem[]
) {
  return {
    date: values.date,
    meetingType: values.meetingType,
    presiding: values.presiding,
    conducting: values.conducting,

    announcements: getAnnouncements(values.announcements ?? ''),

    openingHymnNumber,
    openingHymnTitle: values.openingHymnTitle ?? '',
    openingPrayer: values.openingPrayer ?? '',

    wardBusiness: getWardBusiness(values.wardBusiness ?? ''),
    stakeBusiness: values.stakeBusiness === 'on',

    sacramentHymnNumber,
    sacramentHymnTitle: values.sacramentHymnTitle ?? '',

    speakers,

    closingHymnNumber,
    closingHymnTitle: values.closingHymnTitle ?? '',
    closingPrayer: values.closingPrayer ?? '',
  };
}

function validateAndBuildMeeting(
  formData: FormData
):
  | {
      data: ReturnType<typeof buildMeetingData>;
      errors: Record<string, string[]>;
    }
  | {
      data: null;
      errors: Record<string, string[]>;
    } {
  const rawValues = {
    date: getText(formData, 'date'),
    meetingType: getText(formData, 'meetingType'),
    presiding: getText(formData, 'presiding'),
    conducting: getText(formData, 'conducting'),

    openingHymnNumber: getText(formData, 'openingHymnNumber'),
    openingHymnTitle: getText(formData, 'openingHymnTitle'),
    openingPrayer: getText(formData, 'openingPrayer'),

    announcements: getText(formData, 'announcements'),
    wardBusiness: getText(formData, 'wardBusiness'),
    stakeBusiness: getText(formData, 'stakeBusiness'),

    sacramentHymnNumber: getText(formData, 'sacramentHymnNumber'),
    sacramentHymnTitle: getText(formData, 'sacramentHymnTitle'),

    speakers: getText(formData, 'speakers'),

    closingHymnNumber: getText(formData, 'closingHymnNumber'),
    closingHymnTitle: getText(formData, 'closingHymnTitle'),
    closingPrayer: getText(formData, 'closingPrayer'),
  };

  const validation = MeetingFormSchema.safeParse(rawValues);

  if (!validation.success) {
    return {
      data: null,
      errors: z.flattenError(validation.error)
        .fieldErrors as Record<string, string[]>,
    };
  }

  const openingHymn = parseHymnNumber(
    validation.data.openingHymnNumber ?? '',
    'openingHymnNumber'
  );

  const sacramentHymn = parseHymnNumber(
    validation.data.sacramentHymnNumber ?? '',
    'sacramentHymnNumber'
  );

  const closingHymn = parseHymnNumber(
    validation.data.closingHymnNumber ?? '',
    'closingHymnNumber'
  );

  const speakerResult = parseSpeakers(validation.data.speakers ?? '');

  const extraErrors: Record<string, string[]> = {
    ...openingHymn.errors,
    ...sacramentHymn.errors,
    ...closingHymn.errors,
    ...speakerResult.errors,
  };

  if (Object.keys(extraErrors).length > 0) {
    return {
      data: null,
      errors: extraErrors,
    };
  }

  return {
    data: buildMeetingData(
      validation.data,
      openingHymn.number,
      sacramentHymn.number,
      closingHymn.number,
      speakerResult.speakers
    ),
    errors: {},
  };
}

export async function createMeeting(
  _prevState: State,
  formData: FormData
): Promise<State> {
  const result = validateAndBuildMeeting(formData);

  if (!result.data) {
    return {
      message: 'Please correct the errors below.',
      errors: result.errors,
    };
  }

  try {
    await addMeeting(result.data);

    revalidatePath('/meetings');
  } catch (error: unknown) {
    console.error('Create meeting error:', error);

    return {
      message: 'Unable to create the meeting. Please try again.',
      errors: {},
    };
  }

  redirect('/meetings');
}

export async function updateMeeting(
  _prevState: State,
  formData: FormData
): Promise<State> {
  const id = Number(formData.get('id'));
  const result = validateAndBuildMeeting(formData);

  if (!result.data) {
    return {
      message: 'Please correct the errors below.',
      errors: result.errors,
    };
  }

  if (!Number.isInteger(id) || id < 1) {
    return {
      message: 'Unable to identify this meeting.',
      errors: {},
    };
  }

  try {
    const updatedMeeting = await updateMeetingDb(id, result.data);

    if (!updatedMeeting) {
      return {
        message: 'This meeting no longer exists.',
        errors: {},
      };
    }

    revalidatePath('/meetings');
    revalidatePath(`/meetings/${id}`);
    revalidatePath(`/meetings/${id}/edit`);
  } catch (error: unknown) {
    console.error('Update meeting error:', error);

    return {
      message: 'Unable to update the meeting. Please try again.',
      errors: {},
    };
  }

  redirect(`/meetings/${id}`);
}

export async function deleteMeeting(formData: FormData) {
  const id = Number(formData.get('id'));

  if (!Number.isInteger(id) || id < 1) {
    throw new Error('Invalid meeting ID.');
  }

  try {
    const deleted = await deleteMeetingDb(id);

    if (!deleted) {
      throw new Error('Meeting could not be deleted.');
    }

    revalidatePath('/meetings');
  } catch (error: unknown) {
    console.error('Delete meeting error:', error);
    throw new Error('Unable to delete the meeting. Please try again.');
  }

  redirect('/meetings');
}