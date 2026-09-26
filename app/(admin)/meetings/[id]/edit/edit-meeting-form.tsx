'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import { updateMeeting, type State } from '@/lib/actions';
import type { SacramentMeeting } from '@/lib/types';

const initialState: State = {
  message: '',
  errors: {},
};

type EditMeetingFormProps = {
  meeting: SacramentMeeting;
};

function FieldError({
  id,
  errors,
}: {
  id: string;
  errors?: string[];
}) {
  if (!errors?.length) {
    return null;
  }

  return (
    <p id={id} className="mt-1 text-sm text-red-600" aria-live="polite">
      {errors.join(', ')}
    </p>
  );
}

export default function EditMeetingForm({
  meeting,
}: EditMeetingFormProps) {
  const [state, formAction, isPending] = useActionState(
    updateMeeting,
    initialState
  );

  return (
    <main className="mx-auto max-w-2xl p-6">
      <h1 className="mb-6 text-2xl font-bold">Edit Meeting</h1>

      <form action={formAction} noValidate className="space-y-5">
        <input type="hidden" name="id" value={meeting.id} />

        <div>
          <label htmlFor="date" className="mb-1 block text-sm font-medium">
            Date
          </label>
          <input
            id="date"
            name="date"
            type="date"
            defaultValue={meeting.date}
            aria-describedby={state.errors.date ? 'date-error' : undefined}
            className="w-full rounded border px-3 py-2"
          />
          <FieldError id="date-error" errors={state.errors.date} />
        </div>

        <div>
          <label
            htmlFor="meetingType"
            className="mb-1 block text-sm font-medium"
          >
            Meeting Type
          </label>
          <select
            id="meetingType"
            name="meetingType"
            defaultValue={meeting.meetingType}
            aria-describedby={
              state.errors.meetingType ? 'meetingType-error' : undefined
            }
            className="w-full rounded border px-3 py-2"
          >
            <option value="">Select type</option>
            <option value="testimony">Testimony</option>
            <option value="regular">Regular</option>
            <option value="stake">Stake</option>
            <option value="general">General</option>
          </select>
          <FieldError
            id="meetingType-error"
            errors={state.errors.meetingType}
          />
        </div>

        <div>
          <label
            htmlFor="presiding"
            className="mb-1 block text-sm font-medium"
          >
            Presiding
          </label>
          <input
            id="presiding"
            name="presiding"
            type="text"
            defaultValue={meeting.presiding}
            aria-describedby={
              state.errors.presiding ? 'presiding-error' : undefined
            }
            className="w-full rounded border px-3 py-2"
          />
          <FieldError id="presiding-error" errors={state.errors.presiding} />
        </div>

        <div>
          <label
            htmlFor="conducting"
            className="mb-1 block text-sm font-medium"
          >
            Conducting
          </label>
          <input
            id="conducting"
            name="conducting"
            type="text"
            defaultValue={meeting.conducting}
            aria-describedby={
              state.errors.conducting ? 'conducting-error' : undefined
            }
            className="w-full rounded border px-3 py-2"
          />
          <FieldError id="conducting-error" errors={state.errors.conducting} />
        </div>

        <div>
          <label
            htmlFor="announcements"
            className="mb-1 block text-sm font-medium"
          >
            Announcements
          </label>
          <textarea
            id="announcements"
            name="announcements"
            defaultValue={(meeting.announcements ?? []).join('\n')}
            placeholder="One announcement per line"
            rows={4}
            aria-describedby={
              state.errors.announcements ? 'announcements-error' : undefined
            }
            className="w-full rounded border px-3 py-2"
          />
          <FieldError
            id="announcements-error"
            errors={state.errors.announcements}
          />
          <p className="mt-1 text-sm text-gray-500">
            Enter one announcement per line.
          </p>
        </div>

        <section className="rounded border p-4">
          <h2 className="mb-4 text-lg font-semibold">Opening</h2>

          <div className="mb-4">
            <label
              htmlFor="openingHymnNumber"
              className="mb-1 block text-sm font-medium"
            >
              Opening Hymn Number
            </label>
            <input
              id="openingHymnNumber"
              name="openingHymnNumber"
              type="number"
              min="1"
              defaultValue={meeting.openingHymnNumber || ''}
              aria-describedby={
                state.errors.openingHymnNumber
                  ? 'openingHymnNumber-error'
                  : undefined
              }
              className="w-full rounded border px-3 py-2"
            />
            <FieldError
              id="openingHymnNumber-error"
              errors={state.errors.openingHymnNumber}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="openingHymnTitle"
              className="mb-1 block text-sm font-medium"
            >
              Opening Hymn Title
            </label>
            <input
              id="openingHymnTitle"
              name="openingHymnTitle"
              type="text"
              defaultValue={meeting.openingHymnTitle}
              aria-describedby={
                state.errors.openingHymnTitle
                  ? 'openingHymnTitle-error'
                  : undefined
              }
              className="w-full rounded border px-3 py-2"
            />
            <FieldError
              id="openingHymnTitle-error"
              errors={state.errors.openingHymnTitle}
            />
          </div>

          <div>
            <label
              htmlFor="openingPrayer"
              className="mb-1 block text-sm font-medium"
            >
              Opening Prayer
            </label>
            <input
              id="openingPrayer"
              name="openingPrayer"
              type="text"
              defaultValue={meeting.openingPrayer}
              aria-describedby={
                state.errors.openingPrayer ? 'openingPrayer-error' : undefined
              }
              className="w-full rounded border px-3 py-2"
            />
            <FieldError
              id="openingPrayer-error"
              errors={state.errors.openingPrayer}
            />
          </div>
        </section>

        <div>
          <label
            htmlFor="wardBusiness"
            className="mb-1 block text-sm font-medium"
          >
            Ward Business
          </label>
          <textarea
            id="wardBusiness"
            name="wardBusiness"
            defaultValue={(meeting.wardBusiness ?? [])
            .map((item) => item.description)
            .join('\n')}
            placeholder="One item per line"
            rows={3}
            aria-describedby={
              state.errors.wardBusiness ? 'wardBusiness-error' : undefined
            }
            className="w-full rounded border px-3 py-2"
          />
          <FieldError
            id="wardBusiness-error"
            errors={state.errors.wardBusiness}
          />
          <p className="mt-1 text-sm text-gray-500">
            Enter one ward business item per line.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <input
            id="stakeBusiness"
            name="stakeBusiness"
            type="checkbox"
            defaultChecked={meeting.stakeBusiness}
            className="h-4 w-4"
          />
          <label htmlFor="stakeBusiness" className="text-sm font-medium">
            Stake business was conducted
          </label>
        </div>

        <section className="rounded border p-4">
          <h2 className="mb-4 text-lg font-semibold">Sacrament Hymn</h2>

          <div className="mb-4">
            <label
              htmlFor="sacramentHymnNumber"
              className="mb-1 block text-sm font-medium"
            >
              Sacrament Hymn Number
            </label>
            <input
              id="sacramentHymnNumber"
              name="sacramentHymnNumber"
              type="number"
              min="1"
              defaultValue={meeting.sacramentHymnNumber || ''}
              aria-describedby={
                state.errors.sacramentHymnNumber
                  ? 'sacramentHymnNumber-error'
                  : undefined
              }
              className="w-full rounded border px-3 py-2"
            />
            <FieldError
              id="sacramentHymnNumber-error"
              errors={state.errors.sacramentHymnNumber}
            />
          </div>

          <div>
            <label
              htmlFor="sacramentHymnTitle"
              className="mb-1 block text-sm font-medium"
            >
              Sacrament Hymn Title
            </label>
            <input
              id="sacramentHymnTitle"
              name="sacramentHymnTitle"
              type="text"
              defaultValue={meeting.sacramentHymnTitle}
              aria-describedby={
                state.errors.sacramentHymnTitle
                  ? 'sacramentHymnTitle-error'
                  : undefined
              }
              className="w-full rounded border px-3 py-2"
            />
            <FieldError
              id="sacramentHymnTitle-error"
              errors={state.errors.sacramentHymnTitle}
            />
          </div>
        </section>

        <div>
          <label
            htmlFor="speakers"
            className="mb-1 block text-sm font-medium"
          >
            Speakers
          </label>
          <textarea
            id="speakers"
            name="speakers"
            defaultValue={JSON.stringify(meeting.speakers, null, 2)}
            placeholder='[{"name":"John Doe","topic":"Faith","type":"speaker"}]'
            rows={7}
            aria-describedby={
              state.errors.speakers ? 'speakers-error' : undefined
            }
            className="w-full rounded border px-3 py-2 font-mono text-sm"
          />
          <FieldError id="speakers-error" errors={state.errors.speakers} />
          <p className="mt-1 text-sm text-gray-500">
            Use JSON format for speakers.
          </p>
        </div>

        <section className="rounded border p-4">
          <h2 className="mb-4 text-lg font-semibold">Closing</h2>

          <div className="mb-4">
            <label
              htmlFor="closingHymnNumber"
              className="mb-1 block text-sm font-medium"
            >
              Closing Hymn Number
            </label>
            <input
              id="closingHymnNumber"
              name="closingHymnNumber"
              type="number"
              min="1"
              defaultValue={meeting.closingHymnNumber || ''}
              aria-describedby={
                state.errors.closingHymnNumber
                  ? 'closingHymnNumber-error'
                  : undefined
              }
              className="w-full rounded border px-3 py-2"
            />
            <FieldError
              id="closingHymnNumber-error"
              errors={state.errors.closingHymnNumber}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="closingHymnTitle"
              className="mb-1 block text-sm font-medium"
            >
              Closing Hymn Title
            </label>
            <input
              id="closingHymnTitle"
              name="closingHymnTitle"
              type="text"
              defaultValue={meeting.closingHymnTitle}
              aria-describedby={
                state.errors.closingHymnTitle
                  ? 'closingHymnTitle-error'
                  : undefined
              }
              className="w-full rounded border px-3 py-2"
            />
            <FieldError
              id="closingHymnTitle-error"
              errors={state.errors.closingHymnTitle}
            />
          </div>

          <div>
            <label
              htmlFor="closingPrayer"
              className="mb-1 block text-sm font-medium"
            >
              Closing Prayer
            </label>
            <input
              id="closingPrayer"
              name="closingPrayer"
              type="text"
              defaultValue={meeting.closingPrayer}
              aria-describedby={
                state.errors.closingPrayer ? 'closingPrayer-error' : undefined
              }
              className="w-full rounded border px-3 py-2"
            />
            <FieldError
              id="closingPrayer-error"
              errors={state.errors.closingPrayer}
            />
          </div>
        </section>

        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded bg-blue-600 py-2 text-white hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending ? 'Updating...' : 'Update Meeting'}
        </button>

        {state.message && (
          <p className="text-center text-red-600" aria-live="polite">
            {state.message}
          </p>
        )}

        <Link
          href={`/meetings/${meeting.id}`}
          className="block text-center text-blue-600 hover:underline"
        >
          ← Back to meeting
        </Link>
      </form>
    </main>
  );
}