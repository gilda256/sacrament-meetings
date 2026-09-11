import { redirect } from 'next/navigation';
import { getMeetings } from '@/lib/meetings-db';

export default function CurrentMeetingPage() {
  // Find the most recent Sunday
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 (Sun) through 6 (Sat)
  const sunday = new Date(today);
  sunday.setDate(today.getDate() - dayOfWeek);
  
  // Format as ISO date string: 'YYYY-MM-DD'
  const sundayDate = sunday.toISOString().split('T')[0];
  
  // Find meeting for that Sunday
  const meetings = getMeetings(sundayDate);
  
  if (meetings.length > 0) {
    redirect(`/meetings/${meetings[0].id}`);
  }
  
  // Fallback: redirect to all meetings if no meeting found
  redirect('/meetings');
}