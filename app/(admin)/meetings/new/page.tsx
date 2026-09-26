'use client';

import { useActionState } from 'react';
import { createMeeting, type State } from '@/lib/actions';

const initialState: State = {
  message: '',
  errors: {},
};

export default function NewMeetingPage() {
  const [state, formAction, isPending] = useActionState(createMeeting, initialState);

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Create New Meeting</h1>

      <form action={formAction} noValidate className="space-y-4">
        {/* Date */}
        <div>
          <label htmlFor="date" className="block text-sm font-medium mb-1">
            Date
          </label>
          <input
            id="date"
            name="date"
            type="date"
            required
            aria-describedby={state.errors?.date ? 'date-error' : undefined}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {state.errors?.date && (
            <p id="date-error" className="text-red-600 text-sm mt-1" aria-live="polite">
              {state.errors.date.join(', ')}
            </p>
          )}
        </div>

        {/* Meeting Type */}
        <div>
          <label htmlFor="meetingType" className="block text-sm font-medium mb-1">
            Meeting Type
          </label>
          <select
            id="meetingType"
            name="meetingType"
            required
            aria-describedby={state.errors?.meetingType ? 'meetingType-error' : undefined}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select type</option>
            <option value="testimony">Testimony</option>
            <option value="regular">Regular</option>
            <option value="stake">Stake</option>
            <option value="general">General</option>
          </select>
          {state.errors?.meetingType && (
            <p id="meetingType-error" className="text-red-600 text-sm mt-1" aria-live="polite">
              {state.errors.meetingType.join(', ')}
            </p>
          )}
        </div>

        {/* Presiding */}
        <div>
          <label htmlFor="presiding" className="block text-sm font-medium mb-1">
            Presiding
          </label>
          <input
            id="presiding"
            name="presiding"
            type="text"
            required
            aria-describedby={state.errors?.presiding ? 'presiding-error' : undefined}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {state.errors?.presiding && (
            <p id="presiding-error" className="text-red-600 text-sm mt-1" aria-live="polite">
              {state.errors.presiding.join(', ')}
            </p>
          )}
        </div>

        {/* Conducting */}
        <div>
          <label htmlFor="conducting" className="block text-sm font-medium mb-1">
            Conducting
          </label>
          <input
            id="conducting"
            name="conducting"
            type="text"
            required
            aria-describedby={state.errors?.conducting ? 'conducting-error' : undefined}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {state.errors?.conducting && (
            <p id="conducting-error" className="text-red-600 text-sm mt-1" aria-live="polite">
              {state.errors.conducting.join(', ')}
            </p>
          )}
        </div>

        {/* Opening Hymn */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="openingHymnNumber" className="block text-sm font-medium mb-1">
              Opening Hymn Number
            </label>
            <input
              id="openingHymnNumber"
              name="openingHymnNumber"
              type="text"
              aria-describedby={state.errors?.openingHymnNumber ? 'openingHymnNumber-error' : undefined}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {state.errors?.openingHymnNumber && (
              <p id="openingHymnNumber-error" className="text-red-600 text-sm mt-1" aria-live="polite">
                {state.errors.openingHymnNumber.join(', ')}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="openingHymnTitle" className="block text-sm font-medium mb-1">
              Opening Hymn Title
            </label>
            <input
              id="openingHymnTitle"
              name="openingHymnTitle"
              type="text"
              aria-describedby={state.errors?.openingHymnTitle ? 'openingHymnTitle-error' : undefined}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {state.errors?.openingHymnTitle && (
              <p id="openingHymnTitle-error" className="text-red-600 text-sm mt-1" aria-live="polite">
                {state.errors.openingHymnTitle.join(', ')}
              </p>
            )}
          </div>
        </div>

        {/* Opening Prayer */}
        <div>
          <label htmlFor="openingPrayer" className="block text-sm font-medium mb-1">
            Opening Prayer
          </label>
          <input
            id="openingPrayer"
            name="openingPrayer"
            type="text"
            aria-describedby={state.errors?.openingPrayer ? 'openingPrayer-error' : undefined}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {state.errors?.openingPrayer && (
            <p id="openingPrayer-error" className="text-red-600 text-sm mt-1" aria-live="polite">
              {state.errors.openingPrayer.join(', ')}
            </p>
          )}
        </div>

        {/* Announcements */}
        <div>
          <label htmlFor="announcements" className="block text-sm font-medium mb-1">
            Announcements (comma-separated)
          </label>
          <textarea
            id="announcements"
            name="announcements"
            rows={3}
            aria-describedby={state.errors?.announcements ? 'announcements-error' : undefined}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {state.errors?.announcements && (
            <p id="announcements-error" className="text-red-600 text-sm mt-1" aria-live="polite">
              {state.errors.announcements.join(', ')}
            </p>
          )}
        </div>

        {/* Ward Business */}
        <div>
          <label htmlFor="wardBusiness" className="block text-sm font-medium mb-1">
            Ward Business (comma-separated)
          </label>
          <textarea
            id="wardBusiness"
            name="wardBusiness"
            rows={3}
            aria-describedby={state.errors?.wardBusiness ? 'wardBusiness-error' : undefined}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {state.errors?.wardBusiness && (
            <p id="wardBusiness-error" className="text-red-600 text-sm mt-1" aria-live="polite">
              {state.errors.wardBusiness.join(', ')}
            </p>
          )}
        </div>
        
        <div className="flex items-center gap-2">
        <input
         id="stakeBusiness"
         name="stakeBusiness"
         type="checkbox"
         className="h-4 w-4"
      />

      <label htmlFor="stakeBusiness" className="text-sm font-medium">
       Stake Business
      </label>
      </div>

        {/* Sacrament Hymn */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="sacramentHymnNumber" className="block text-sm font-medium mb-1">
              Sacrament Hymn Number
            </label>
            <input
              id="sacramentHymnNumber"
              name="sacramentHymnNumber"
              type="text"
              aria-describedby={state.errors?.sacramentHymnNumber ? 'sacramentHymnNumber-error' : undefined}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {state.errors?.sacramentHymnNumber && (
              <p id="sacramentHymnNumber-error" className="text-red-600 text-sm mt-1" aria-live="polite">
                {state.errors.sacramentHymnNumber.join(', ')}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="sacramentHymnTitle" className="block text-sm font-medium mb-1">
              Sacrament Hymn Title
            </label>
            <input
              id="sacramentHymnTitle"
              name="sacramentHymnTitle"
              type="text"
              aria-describedby={state.errors?.sacramentHymnTitle ? 'sacramentHymnTitle-error' : undefined}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {state.errors?.sacramentHymnTitle && (
              <p id="sacramentHymnTitle-error" className="text-red-600 text-sm mt-1" aria-live="polite">
                {state.errors.sacramentHymnTitle.join(', ')}
              </p>
            )}
          </div>
        </div>

        {/* Speakers */}
        <div>
          <label htmlFor="speakers" className="block text-sm font-medium mb-1">
            Speakers (JSON array)
          </label>
          <textarea
            id="speakers"
            name="speakers"
            rows={4}
            placeholder='[{"name": "John Doe", "topic": "Faith", "type": "speaker"}]'
            aria-describedby={state.errors?.speakers ? 'speakers-error' : undefined}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {state.errors?.speakers && (
            <p id="speakers-error" className="text-red-600 text-sm mt-1" aria-live="polite">
              {state.errors.speakers.join(', ')}
            </p>
          )}
        </div>

        {/* Closing Hymn */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="closingHymnNumber" className="block text-sm font-medium mb-1">
              Closing Hymn Number
            </label>
            <input
              id="closingHymnNumber"
              name="closingHymnNumber"
              type="text"
              aria-describedby={state.errors?.closingHymnNumber ? 'closingHymnNumber-error' : undefined}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {state.errors?.closingHymnNumber && (
              <p id="closingHymnNumber-error" className="text-red-600 text-sm mt-1" aria-live="polite">
                {state.errors.closingHymnNumber.join(', ')}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="closingHymnTitle" className="block text-sm font-medium mb-1">
              Closing Hymn Title
            </label>
            <input
              id="closingHymnTitle"
              name="closingHymnTitle"
              type="text"
              aria-describedby={state.errors?.closingHymnTitle ? 'closingHymnTitle-error' : undefined}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {state.errors?.closingHymnTitle && (
              <p id="closingHymnTitle-error" className="text-red-600 text-sm mt-1" aria-live="polite">
                {state.errors.closingHymnTitle.join(', ')}
              </p>
            )}
          </div>
        </div>

        {/* Closing Prayer */}
        <div>
          <label htmlFor="closingPrayer" className="block text-sm font-medium mb-1">
            Closing Prayer
          </label>
          <input
            id="closingPrayer"
            name="closingPrayer"
            type="text"
            aria-describedby={state.errors?.closingPrayer ? 'closingPrayer-error' : undefined}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {state.errors?.closingPrayer && (
            <p id="closingPrayer-error" className="text-red-600 text-sm mt-1" aria-live="polite">
              {state.errors.closingPrayer.join(', ')}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending ? 'Creating...' : 'Create Meeting'}
        </button>

        {/* Global Error Message */}
        {state.message && (
          <p className="text-red-600 text-center" aria-live="polite">
            {state.message}
          </p>
        )}
      </form>
    </main>
  );
}