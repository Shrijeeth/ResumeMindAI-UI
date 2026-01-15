'use client';

import Link from 'next/link';

interface SidebarNavItemProps {
  icon: string;
  label: string;
  href: string;
  active?: boolean;
}

export default function SidebarNavItem({ icon, label, href, active = false }: SidebarNavItemProps) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
        active
          ? 'bg-primary/10 text-primary'
          : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
      }`}
    >
      <span className="material-symbols-outlined text-xl">{icon}</span>
      {label}
    </Link>
  );
}
