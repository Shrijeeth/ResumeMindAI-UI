'use client';

import { User } from '@supabase/supabase-js';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import SidebarNavItem from './SidebarNavItem';

type SidebarVariant = 'desktop' | 'mobile';

interface SidebarProps {
  user: User;
  onSignOut: () => void;
  variant?: SidebarVariant;
  onNavigate?: () => void;
}

export default function Sidebar({ user, onSignOut, variant = 'desktop', onNavigate }: SidebarProps) {
  const pathname = usePathname();

  const mainNavItems = [
    { icon: 'dashboard', label: 'Dashboard', href: '/dashboard' },
    { icon: 'description', label: 'My Resumes', href: '/dashboard/resumes' },
    { icon: 'hub', label: 'Knowledge Graph', href: '/dashboard/graph' },
    { icon: 'work', label: 'Job Matches', href: '/dashboard/jobs' },
    { icon: 'analytics', label: 'Analytics', href: '/dashboard/analytics' },
  ];

  const settingsNavItems = [
    { icon: 'settings', label: 'Settings', href: '/dashboard/settings' },
    { icon: 'help', label: 'Help & Support', href: '/dashboard/help' },
  ];

  const isMobile = variant === 'mobile';

  return (
    <aside
      className={`$${''}
        ${isMobile ? 'flex flex-col h-full w-full bg-slate-900 border-r border-slate-700/50' : 'hidden lg:flex lg:flex-col w-64 border-r border-slate-700/50 bg-slate-900/50 backdrop-blur-xl'}`}
    >
      {/* Logo (desktop only; mobile header is provided by drawer container) */}
      {!isMobile && (
        <div className="flex items-center gap-3 px-6 h-16 border-b border-slate-700/50">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-white text-lg">hub</span>
          </div>
          <span className="font-semibold text-white tracking-tight">
            ResumeMind<span className="text-primary">AI</span>
          </span>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <div className="space-y-1">
          {mainNavItems.map((item) => (
            <SidebarNavItem
              key={item.href}
              icon={item.icon}
              label={item.label}
              href={item.href}
              active={pathname === item.href}
              onClick={onNavigate}
            />
          ))}
        </div>

        <div className="mt-8">
          <p className="px-4 text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-2">
            Settings
          </p>
          <div className="space-y-1">
            {settingsNavItems.map((item) => (
              <SidebarNavItem
                key={item.href}
                icon={item.icon}
                label={item.label}
                href={item.href}
                active={pathname === item.href}
                onClick={onNavigate}
              />
            ))}
          </div>
        </div>
      </nav>

      {/* User Profile */}
      <div className="border-t border-slate-700/50 p-4">
        <div className="flex items-center gap-3">
          {user.user_metadata?.avatar_url ? (
            <Image
              src={user.user_metadata.avatar_url}
              alt="Profile"
              width={36}
              height={36}
              className="rounded-full border-2 border-primary"
            />
          ) : (
            <div className="w-9 h-9 bg-primary/20 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-lg">person</span>
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">
              {user.user_metadata?.full_name ?? 'User'}
            </p>
            <p className="text-xs text-slate-400 truncate">{user.email}</p>
          </div>
        </div>
        <button
          onClick={() => {
            onNavigate?.();
            onSignOut();
          }}
          className="mt-3 w-full flex items-center justify-center gap-2 px-3 py-2 text-sm text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors"
        >
          <span className="material-symbols-outlined text-lg">logout</span>
          Sign Out
        </button>
      </div>
    </aside>
  );
}
