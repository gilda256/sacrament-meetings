import Link from 'next/link';
import type { SacramentMeeting } from '@/lib/types';

interface Props {
  meeting: SacramentMeeting;
}

export default function MeetingCard({ meeting }: Props) {
  return (
    <Link href={`/meetings/${meeting.id}`} className="block border rounded p-4 hover:shadow">
      <h2 className="text-xl font-bold">{meeting.date}</h2>
      <p className="text-gray-600">{meeting.meetingType} meeting</p>
      <p className="text-gray-500">Presiding: {meeting.presiding}</p>
    </Link>
  );
}