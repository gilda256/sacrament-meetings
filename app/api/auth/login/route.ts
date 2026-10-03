import { NextResponse } from 'next/server';
import { SESSION_COOKIE } from '@/lib/auth';

const DEMO_EMAIL = 'bishopric@example.com';
const DEMO_PASSWORD = 'planner-demo';

export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (email !== DEMO_EMAIL || password !== DEMO_PASSWORD) {
    return NextResponse.json(
      { message: 'Invalid email or password.' },
      { status: 401 }
    );
  }

  const response = NextResponse.json({
    message: 'Signed in successfully.',
  });

  response.cookies.set({
    name: SESSION_COOKIE,
    value: 'bishopric',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 8,
  });

  return response;
}