import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Sacrament Meeting Planner</h1>
        <p className="text-gray-600 mb-8">
          Plan, manage, and review sacrament meeting agendas for your ward.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/meetings"
            className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
          >
            View All Meetings
          </Link>
          <Link
            href="/meetings/current"
            className="bg-gray-200 text-gray-800 px-6 py-3 rounded hover:bg-gray-300"
          >
            Current Meeting
          </Link>
        </div>
      </div>
    </main>
  );
}