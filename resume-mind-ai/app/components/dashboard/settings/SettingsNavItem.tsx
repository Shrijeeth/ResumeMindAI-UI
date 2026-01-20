"use client";

import Link from "next/link";

interface SettingsNavItemProps {
  icon: string;
  label: string;
  href: string;
  active?: boolean;
  badge?: string;
}

export default function SettingsNavItem({
  icon,
  label,
  href,
  active = false,
  badge,
}: SettingsNavItemProps) {
  return (
    <Link
      href={href}
      className={`flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
        active
          ? "bg-primary/10 text-primary border-l-2 border-primary rounded-l-none"
          : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
      }`}
    >
      <div className="flex items-center gap-3">
        <span className="material-symbols-outlined text-[20px]">{icon}</span>
        <span>{label}</span>
      </div>
      {badge && (
        <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-700 text-slate-500">
          {badge}
        </span>
      )}
    </Link>
  );
}
