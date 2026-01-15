'use client';

import { User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { createClient } from '@/app/lib/supabase/client';
import DashboardLayout from '@/app/components/dashboard/layout/DashboardLayout';
import UploadCard from '@/app/components/dashboard/cards/UploadCard';
import PipelineStatusCard from '@/app/components/dashboard/cards/PipelineStatusCard';
import RecentAnalysesList, { Analysis } from '@/app/components/dashboard/lists/RecentAnalysesList';
import KnowledgeGraphCard from '@/app/components/dashboard/cards/KnowledgeGraphCard';
import InsightCard from '@/app/components/dashboard/cards/InsightCard';

interface DashboardContentProps {
  user: User;
}

// Mock data for development
const mockAnalyses: Analysis[] = [
  {
    id: '1',
    fileName: 'Senior_DevOps_2024.pdf',
    status: 'completed',
    nodesExtracted: 45,
    timestamp: '2 hours ago',
  },
  {
    id: '2',
    fileName: 'Product_Manager_v2.docx',
    status: 'completed',
    nodesExtracted: 32,
    timestamp: 'Yesterday',
  },
  {
    id: '3',
    fileName: 'Consulting_Profile_Draft.pdf',
    status: 'processing',
    nodesExtracted: 0,
    timestamp: '',
  },
];

const mockPipelineStats = {
  tokensUsed: 42000,
  tokensLimit: 50000,
  resumesProcessed: 12,
  graphNodes: 1200,
};

const insights = [
  {
    icon: 'warning',
    iconColor: 'bg-red-500/10',
    iconTextColor: 'text-red-400',
    title: 'Skill Gap',
    description: 'Missing Kubernetes certification for Senior DevOps roles.',
    progressValue: 30,
  },
  {
    icon: 'trending_up',
    iconColor: 'bg-blue-500/10',
    iconTextColor: 'text-blue-400',
    title: 'Market Position',
    description: 'Your profile is in the top 15% for Python developers.',
    highlightValue: 'Top 15%',
  },
  {
    icon: 'school',
    iconColor: 'bg-primary/10',
    iconTextColor: 'text-primary',
    title: 'Interview Prep',
    description: 'Generate technical questions based on your extracted skills.',
    actionLabel: 'Start Session',
  },
  {
    icon: 'lightbulb',
    iconColor: 'bg-emerald-500/10',
    iconTextColor: 'text-emerald-400',
    title: 'Optimization',
    description: '3 suggestions to improve your "Project Management" section.',
    actionLabel: 'Review Now',
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
    console.log('Explore graph');
    // TODO: Navigate to graph explorer
  };

  return (
    <DashboardLayout user={user} pageTitle="Dashboard Overview" onSignOut={handleSignOut}>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Row 1: Upload + Pipeline Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <UploadCard onFileSelect={handleFileSelect} />
          <PipelineStatusCard
            status="active"
            llmProvider="GPT-4o"
            stats={mockPipelineStats}
          />
        </div>

        {/* Row 2: Recent Analyses + Knowledge Graph */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RecentAnalysesList
              analyses={mockAnalyses}
              onViewAnalysis={handleViewAnalysis}
              onViewAll={() => router.push('/dashboard/resumes')}
            />
          </div>
          <KnowledgeGraphCard
            topNode="Python"
            matchScore={98}
            onExplore={handleExploreGraph}
          />
        </div>

        {/* Row 3: Insight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {insights.map((insight, index) => (
            <InsightCard
              key={index}
              icon={insight.icon}
              iconColor={insight.iconColor}
              iconTextColor={insight.iconTextColor}
              title={insight.title}
              description={insight.description}
              progressValue={insight.progressValue}
              highlightValue={insight.highlightValue}
              actionLabel={insight.actionLabel}
              onAction={insight.actionLabel ? () => console.log(`Action: ${insight.title}`) : undefined}
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
