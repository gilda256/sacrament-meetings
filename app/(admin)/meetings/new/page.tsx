import { redirect } from 'next/navigation';
import NewMeetingForm from '@/components/NewMeetingForm';
import { isAuthenticated } from '@/lib/auth';

export default async function NewMeetingPage() {
  if (!(await isAuthenticated())) {
    redirect('/login?next=/meetings/new');
  }

  return <NewMeetingForm />;
}