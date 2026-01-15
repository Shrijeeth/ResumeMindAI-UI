'use client';

import { User } from '@supabase/supabase-js';
import DashboardLayout from './layout/DashboardLayout';
import { createClient } from '@/app/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface ComingSoonPageProps {
  title: string;
  description: string;
  icon: string;
  features?: string[];
}

export default function ComingSoonPage({
  title,
  description,
  icon,
  features = [],
}: ComingSoonPageProps) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/auth/login');
    router.refresh();
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background-dark flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <DashboardLayout user={user} pageTitle={title} onSignOut={handleSignOut}>
      <div className="max-w-2xl mx-auto py-12 px-4">
        <div className="glass-card p-8 rounded-2xl text-center">
          {/* Icon */}
          <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <span className="material-symbols-outlined text-primary text-4xl">{icon}</span>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-white mb-3">{title}</h1>

          {/* Coming Soon Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 mb-6">
            <span className="material-symbols-outlined text-orange-400 text-sm">construction</span>
            <span className="text-orange-400 text-sm font-medium">Coming Soon</span>
          </div>

          {/* Description */}
          <p className="text-slate-400 mb-8 max-w-md mx-auto">{description}</p>

          {/* Features Preview */}
          {features.length > 0 && (
            <div className="text-left bg-slate-800/30 rounded-xl p-6">
              <h3 className="text-sm font-semibold text-slate-300 mb-4 uppercase tracking-wider">
                Planned Features
              </h3>
              <ul className="space-y-3">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3 text-slate-400">
                    <span className="material-symbols-outlined text-primary text-lg">
                      check_circle
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Back to Dashboard */}
          <button
            onClick={() => router.push('/dashboard')}
            className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-violet-600 text-white rounded-lg font-medium transition-colors"
          >
            <span className="material-symbols-outlined text-lg">arrow_back</span>
            Back to Dashboard
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
