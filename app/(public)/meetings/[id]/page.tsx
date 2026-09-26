import Link from 'next/link';
import { getMeetingById } from '@/lib/meetings-db';

export default async function MeetingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const meeting = await getMeetingById(parseInt(id, 10));

  if (!meeting) {
    return (
      <main className="p-8">
        <Link href="/meetings" className="text-blue-600 hover:underline">
          ← Back
        </Link>

        <h1 className="mt-4 text-2xl font-bold">Meeting not found</h1>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl p-8">
      <Link
        href="/meetings"
        className="mb-4 block text-blue-600 hover:underline"
      >
        ← Back to meetings
      </Link>

      <h1 className="mb-2 text-3xl font-bold">{meeting.date}</h1>

      <p className="mb-6 text-gray-600">
        {meeting.meetingType} meeting
      </p>

      <div className="space-y-6">
        <section>
          <h2 className="mb-2 text-xl font-semibold">
            Presiding & Conducting
          </h2>
          <p>Presiding: {meeting.presiding}</p>
          <p>Conducting: {meeting.conducting}</p>
        </section>

        {meeting.announcements && meeting.announcements.length > 0 && (
          <section>
            <h2 className="mb-2 text-xl font-semibold">Announcements</h2>
            <ul className="list-inside list-disc">
              {meeting.announcements.map((announcement, index) => (
                <li key={index}>{announcement}</li>
              ))}
            </ul>
          </section>
        )}

        <section>
          <h2 className="mb-2 text-xl font-semibold">Opening</h2>

          <p>
            Hymn:{' '}
            {meeting.openingHymnNumber
              ? `#${meeting.openingHymnNumber} - ${
                  meeting.openingHymnTitle || 'Untitled hymn'
                }`
              : 'N/A'}
          </p>

          <p>Prayer: {meeting.openingPrayer || 'N/A'}</p>
        </section>

        {meeting.wardBusiness && meeting.wardBusiness.length > 0 && (
          <section>
            <h2 className="mb-2 text-xl font-semibold">Ward Business</h2>
            <ul className="list-inside list-disc">
              {meeting.wardBusiness.map((item, index) => (
                <li key={index}>{item.description}</li>
              ))}
            </ul>
          </section>
        )}

        {meeting.stakeBusiness && (
          <section>
            <h2 className="mb-2 text-xl font-semibold">Stake Business</h2>
            <p>Stake business was conducted.</p>
          </section>
        )}

        <section>
          <h2 className="mb-2 text-xl font-semibold">Sacrament Hymn</h2>

          <p>
            {meeting.sacramentHymnNumber
              ? `#${meeting.sacramentHymnNumber} - ${
                  meeting.sacramentHymnTitle || 'Untitled hymn'
                }`
              : 'N/A'}
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold">Speakers</h2>

          <ul className="list-inside list-disc">
            {meeting.speakers && meeting.speakers.length > 0 ? (
              meeting.speakers.map((speaker, index) => (
                <li key={index}>
                  {speaker.name}
                  {speaker.topic ? ` - ${speaker.topic}` : ''}
                  {speaker.type === 'musical-number'
                    ? ' (Musical Number)'
                    : ''}
                </li>
              ))
            ) : (
              <li>No speakers</li>
            )}
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold">Closing</h2>

          <p>
            Hymn:{' '}
            {meeting.closingHymnNumber
              ? `#${meeting.closingHymnNumber} - ${
                  meeting.closingHymnTitle || 'Untitled hymn'
                }`
              : 'N/A'}
          </p>

          <p>Prayer: {meeting.closingPrayer || 'N/A'}</p>
        </section>
      </div>
    </main>
  );
}