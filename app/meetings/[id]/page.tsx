import Link from 'next/link';
import type { SacramentMeeting } from '@/lib/types';

async function getMeeting(id: number): Promise<SacramentMeeting> {
  const res = await fetch(`http://localhost:3000/api/meetings/${id}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch meeting');
  return res.json();
}

export default async function MeetingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const meeting = await getMeeting(parseInt(id));

  return (
    <main className="min-h-screen p-8 max-w-3xl mx-auto">
      <Link href="/" className="text-blue-600 hover:underline mb-4 block">← Back to meetings</Link>
      
      <h1 className="text-3xl font-bold mb-2">{meeting.date}</h1>
      <p className="text-gray-600 mb-6">{meeting.meetingType} meeting</p>

      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-2">Presiding & Conducting</h2>
          <p>Presiding: {meeting.presiding}</p>
          <p>Conducting: {meeting.conducting}</p>
        </section>

        {meeting.announcements && meeting.announcements.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold mb-2">Announcements</h2>
            <ul className="list-disc list-inside">
              {meeting.announcements.map((a, i) => (
                <li key={i}>{a}</li>
              ))}
            </ul>
          </section>
        )}

        <section>
          <h2 className="text-xl font-semibold mb-2">Opening</h2>
          <p>Hymn: #{meeting.openingHymn.number} - {meeting.openingHymn.title}</p>
          <p>Prayer: {meeting.openingPrayer}</p>
        </section>

        {meeting.wardBusiness.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold mb-2">Ward Business</h2>
            <ul className="list-disc list-inside">
              {meeting.wardBusiness.map((item, i) => (
                <li key={i}>{item.description}</li>
              ))}
            </ul>
          </section>
        )}

        {meeting.stakeBusiness && (
          <section>
            <h2 className="text-xl font-semibold mb-2">Stake Business</h2>
            <p>Stake business was conducted.</p>
          </section>
        )}

        <section>
          <h2 className="text-xl font-semibold mb-2">Sacrament Hymn</h2>
          <p>#{meeting.sacramentHymn.number} - {meeting.sacramentHymn.title}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Speakers</h2>
          <ul className="list-disc list-inside">
            {meeting.speakers.map((s, i) => (
              <li key={i}>
                {s.name}
                {s.topic && ` - ${s.topic}`}
                {s.type === 'musical-number' && ' (Musical Number)'}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Closing</h2>
          <p>Hymn: #{meeting.closingHymn.number} - {meeting.closingHymn.title}</p>
          <p>Prayer: {meeting.closingPrayer}</p>
        </section>
      </div>
    </main>
  );
}