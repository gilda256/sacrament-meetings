import { redirect } from 'next/navigation';
import { getMeetings } from '@/lib/meetings-db';


export default async function CurrentMeetingPage() {
  const meetings = await getMeetings();
  
  if (meetings.length === 0) {
    redirect('/meetings');
  }

  const thisSunday = meetings[0];
  redirect(`/meetings/${thisSunday.id}`);
}