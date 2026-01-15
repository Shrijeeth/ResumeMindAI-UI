import { redirect } from 'next/navigation';
import { createClient } from '@/app/lib/supabase/server';
import ComingSoonPage from '@/app/components/dashboard/ComingSoonPage';

export const metadata = {
  title: 'Analytics | ResumeMindAI',
};

export default async function AnalyticsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/login');
  }

  return (
    <ComingSoonPage
      title="Analytics"
      description="Track your career growth with detailed analytics. Monitor skill development, market positioning, and application success rates."
      icon="analytics"
      features={[
        'Skill growth tracking',
        'Market position insights',
        'Resume performance metrics',
        'Industry trend analysis',
      ]}
    />
  );
}
