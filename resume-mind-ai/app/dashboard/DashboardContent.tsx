'use client';

import { User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { createClient } from '@/app/lib/supabase/client';
import DashboardLayout from '@/app/components/dashboard/layout/DashboardLayout';
import UploadCard from '@/app/components/dashboard/cards/UploadCard';
import PipelineStatusCard from '@/app/components/dashboard/cards/PipelineStatusCard';
import RecentAnalysesList from '@/app/components/dashboard/lists/RecentAnalysesList';
import KnowledgeGraphCard from '@/app/components/dashboard/cards/KnowledgeGraphCard';
import InsightCard from '@/app/components/dashboard/cards/InsightCard';

interface DashboardContentProps {
  user: User;
}

// Empty state insights - shown when no data is available
const emptyInsights = [
  {
    icon: 'warning',
    iconColor: 'bg-red-500/10',
    iconTextColor: 'text-red-400',
    title: 'Skill Gap',
    description: 'Upload a resume to identify skill gaps for your target roles.',
    isEmpty: true,
    emptyMessage: 'Upload a resume to identify skill gaps for your target roles.',
    emptyActionLabel: 'Upload Resume',
    emptyActionHref: '/dashboard',
  },
  {
    icon: 'trending_up',
    iconColor: 'bg-blue-500/10',
    iconTextColor: 'text-blue-400',
    title: 'Market Position',
    description: 'See how your profile compares to others in your field.',
    isEmpty: true,
    emptyMessage: 'Analyze your resume to see your market positioning.',
    emptyActionLabel: 'Get Started',
    emptyActionHref: '/dashboard',
  },
  {
    icon: 'school',
    iconColor: 'bg-primary/10',
    iconTextColor: 'text-primary',
    title: 'Interview Prep',
    description: 'Generate interview questions based on your skills.',
    isEmpty: true,
    emptyMessage: 'Build your knowledge graph first to generate interview prep.',
    emptyActionLabel: 'Learn More',
    emptyActionHref: '/dashboard/help',
  },
  {
    icon: 'lightbulb',
    iconColor: 'bg-emerald-500/10',
    iconTextColor: 'text-emerald-400',
    title: 'Optimization',
    description: 'Get AI suggestions to improve your resume.',
    isEmpty: true,
    emptyMessage: 'Upload a resume to receive optimization suggestions.',
    emptyActionLabel: 'Upload Resume',
    emptyActionHref: '/dashboard',
  },
];

export default function DashboardContent({ user }: DashboardContentProps) {
  const router = useRouter();

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/auth/login');
    router.refresh();
  };

  const handleFileSelect = (file: File) => {
    console.log('File selected:', file.name);
    // TODO: Implement file upload via API client
  };

  const handleViewAnalysis = (id: string) => {
    console.log('View analysis:', id);
    // TODO: Navigate to analysis detail page
  };

  const handleExploreGraph = () => {
    router.push('/dashboard/graph');
  };

  return (
    <DashboardLayout user={user} pageTitle="Dashboard Overview" onSignOut={handleSignOut}>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Row 1: Upload + Pipeline Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <UploadCard onFileSelect={handleFileSelect} />
          {/* Empty state - no LLM provider configured */}
          <PipelineStatusCard />
        </div>

        {/* Row 2: Recent Analyses + Knowledge Graph */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {/* Empty state - no analyses */}
            <RecentAnalysesList
              analyses={[]}
              onViewAnalysis={handleViewAnalysis}
              onViewAll={() => router.push('/dashboard/resumes')}
            />
          </div>
          {/* Empty state - no graph data */}
          <KnowledgeGraphCard
            hasData={false}
            onExplore={handleExploreGraph}
          />
        </div>

        {/* Row 3: Insight Cards - All in empty state */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {emptyInsights.map((insight, index) => (
            <InsightCard
              key={index}
              icon={insight.icon}
              iconColor={insight.iconColor}
              iconTextColor={insight.iconTextColor}
              title={insight.title}
              description={insight.description}
              isEmpty={insight.isEmpty}
              emptyMessage={insight.emptyMessage}
              emptyActionLabel={insight.emptyActionLabel}
              emptyActionHref={insight.emptyActionHref}
            />
          ))}
        </div>

        {/* Footer */}
        <div className="pt-6 border-t border-slate-700/50 text-center text-xs text-slate-500">
          <p>&copy; 2026 ResumeMindAI. Built with GraphRAG & LLM technology.</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
