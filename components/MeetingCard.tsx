'use client';

import Link from 'next/link';
import type { SacramentMeeting } from '@/lib/types';
import { deleteMeeting} from '@/lib/actions';

interface Props {
  meeting: SacramentMeeting;
}

export default function MeetingCard({ meeting }: Props) {
  return (
    <div className="border p-4 rounded shadow">
      <h3 className="font-bold text-lg">{meeting.date}</h3>
      <p className="text-gray-700">{meeting.meetingType}</p>
      <p className="text-sm text-gray-600">Presiding: {meeting.presiding}</p>
      <p className="text-sm text-gray-600">Conducting: {meeting.conducting}</p>

      <div className="mt-4 flex gap-2">
        <Link
          href={`/meetings/${meeting.id}`}
          className="text-blue-600 hover:underline"
        >
          View
        </Link>
        <Link
          href={`/meetings/${meeting.id}/edit`}
          className="text-green-600 hover:underline"
        >
          Edit
        </Link>
        <form action={deleteMeeting}>
          <input type="hidden" name="id" value={meeting.id} />
          <button
            type="submit"
            className="text-red-600 hover:underline"
          >
            Delete
          </button>
        </form>
      </div>
    </div>
  );
}