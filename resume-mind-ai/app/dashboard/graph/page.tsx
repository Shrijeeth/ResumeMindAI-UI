import { redirect } from 'next/navigation';
import { createClient } from '@/app/lib/supabase/server';
import ComingSoonPage from '@/app/components/dashboard/ComingSoonPage';

export const metadata = {
  title: 'Knowledge Graph | ResumeMindAI',
};

export default async function GraphPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/login');
  }

  return (
    <ComingSoonPage
      title="Knowledge Graph"
      description="Explore your career as an interactive knowledge graph. Visualize connections between skills, experiences, and achievements."
      icon="hub"
      features={[
        'Interactive 3D graph visualization',
        'Explore skill relationships',
        'Discover hidden career patterns',
        'Export graph data',
      ]}
    />
  );
}
