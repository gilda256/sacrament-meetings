import MeetingCard from '@/components/MeetingCard';
import { getMeetings } from '@/lib/meetings-db';

export default async function MeetingsPage() {
  const meetings = getMeetings();

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