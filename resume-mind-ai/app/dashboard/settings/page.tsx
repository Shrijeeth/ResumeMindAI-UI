import { redirect } from 'next/navigation';
import { createClient } from '@/app/lib/supabase/server';
import ComingSoonPage from '@/app/components/dashboard/ComingSoonPage';

export const metadata = {
  title: 'Settings | ResumeMindAI',
};

export default async function SettingsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/login');
  }

  return (
    <ComingSoonPage
      title="Settings"
      description="Configure your ResumeMindAI experience. Manage account settings, preferences, and integrations."
      icon="settings"
      features={[
        'Account management',
        'Notification preferences',
        'Privacy controls',
        'Data export options',
      ]}
    />
  );
}
