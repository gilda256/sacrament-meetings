import { cookies } from 'next/headers';

export const SESSION_COOKIE = 'sacrament-planner-session';

export async function isAuthenticated() {
  const cookieStore = await cookies();

  return cookieStore.get(SESSION_COOKIE)?.value === 'bishopric';
}