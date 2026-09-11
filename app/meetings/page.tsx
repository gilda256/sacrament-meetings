import MeetingCard from '@/components/MeetingCard';
import type { SacramentMeeting } from '@/lib/types';

async function getMeetings(): Promise<SacramentMeeting[]> {
  const res = await fetch('http://localhost:3000/api/meetings', { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch meetings');
  return res.json();
}

export default async function MeetingsPage() {
  const meetings = await getMeetings();

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">All Meetings</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {meetings.map(m => (
          <MeetingCard key={m.id} meeting={m} />
        ))}
      </div>
    </main>
  );
}