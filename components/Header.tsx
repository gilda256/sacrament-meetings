import Link from 'next/link';
import AuthControls from '@/components/AuthControls';
import { isAuthenticated } from '@/lib/auth';

export default async function Header() {
  const isSignedIn = await isAuthenticated();

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="bg-blue-600 p-4 text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
        <h1 className="text-xl font-bold">Provo 5th Ward</h1>

        <p className="text-sm">{today}</p>

        {isSignedIn ? (
          <AuthControls />
        ) : (
          <Link
            href="/login"
            className="rounded bg-white px-3 py-2 text-sm font-medium text-blue-700 hover:bg-blue-50"
          >
            Sign in
          </Link>
        )}
      </div>
    </header>
  );
}