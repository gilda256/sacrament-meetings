'use client';

import { useRouter } from 'next/navigation';

export default function AuthControls() {
  const router = useRouter();

  async function handleSignOut() {
    await fetch('/api/auth/logout', {
      method: 'POST',
    });

    router.push('/login');
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleSignOut}
      className="rounded bg-white px-3 py-2 text-sm font-medium text-blue-700 hover:bg-blue-50"
    >
      Sign out
    </button>
  );
}