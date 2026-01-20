"use client";

import { usePathname } from "next/navigation";
import SettingsNavItem from "./SettingsNavItem";

interface SettingsNavItemData {
  icon: string;
  label: string;
  href: string;
  badge?: string;
}

interface SettingsNavSection {
  title: string;
  items: SettingsNavItemData[];
}

const settingsNavSections: SettingsNavSection[] = [
  {
    title: "AI Configuration",
    items: [
      {
        icon: "smart_toy",
        label: "LLM Providers",
        href: "/dashboard/settings/llm-providers",
      },
    ],
  },
  {
    title: "Developer",
    items: [
      {
        icon: "key",
        label: "API Keys",
        href: "/dashboard/settings/api-keys",
        badge: "Soon",
      },
      {
        icon: "webhook",
        label: "Webhooks",
        href: "/dashboard/settings/webhooks",
        badge: "Soon",
      },
    ],
  },
  {
    title: "App",
    items: [
      {
        icon: "notifications",
        label: "Notifications",
        href: "/dashboard/settings/notifications",
        badge: "Soon",
      },
    ],
  },
];

export default function SettingsNav() {
  const pathname = usePathname();

  return (
    <nav className="w-64 flex-shrink-0 space-y-6">
      {settingsNavSections.map((section) => (
        <div key={section.title}>
          <h3 className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
            {section.title}
          </h3>
          <div className="space-y-1">
            {section.items.map((item) => (
              <SettingsNavItem
                key={item.href}
                icon={item.icon}
                label={item.label}
                href={item.href}
                active={pathname === item.href}
                badge={item.badge}
              />
            ))}
          </div>
        </div>
      ))}
    </nav>
  );
}
