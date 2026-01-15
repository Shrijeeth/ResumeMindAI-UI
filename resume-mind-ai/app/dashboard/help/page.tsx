import { redirect } from 'next/navigation';
import { createClient } from '@/app/lib/supabase/server';
import ComingSoonPage from '@/app/components/dashboard/ComingSoonPage';

export const metadata = {
  title: 'Help & Support | ResumeMindAI',
};

export default async function HelpPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/login');
  }

  return (
    <ComingSoonPage
      title="Help & Support"
      description="Get help with ResumeMindAI. Access documentation, tutorials, and contact support."
      icon="help"
      features={[
        'Getting started guides',
        'Video tutorials',
        'FAQ section',
        'Contact support team',
      ]}
    />
  );
}
