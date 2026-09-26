import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="p-8 text-center">
      <h1 className="text-2xl font-bold mb-4">Meeting Not Found</h1>
      <p className="text-gray-600 mb-4">
        The meeting you&apos;re looking for doesn&apos;t exist or has been removed.
      </p>
      <Link
        href="/meetings"
        className="text-blue-600 hover:underline"
      >
        ← Back to meetings
      </Link>
    </main>
  );
}