import { getMeetings } from '@/lib/meetings-db';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get('date');

  if (date) {
    const allMeetings = await getMeetings();
    const meeting = allMeetings.find((m) => m.date === date);
    if (!meeting) {
      return NextResponse.json({ error: 'Meeting not found' }, { status: 404 });
    }
    return NextResponse.json(meeting);
  }

  const meetings = await getMeetings();
  return NextResponse.json(meetings);
}