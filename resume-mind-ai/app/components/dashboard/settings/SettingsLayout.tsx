"use client";

import { User } from "@supabase/supabase-js";
import DashboardLayout from "../layout/DashboardLayout";
import SettingsNav from "./SettingsNav";

interface SettingsLayoutProps {
  children: React.ReactNode;
  user: User;
  onSignOut: () => void;
}

export default function SettingsLayout({
  children,
  user,
  onSignOut,
}: SettingsLayoutProps) {
  return (
    <DashboardLayout user={user} pageTitle="Settings" onSignOut={onSignOut}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          <SettingsNav />
          <div className="flex-1 min-w-0">{children}</div>
        </div>
      </div>
    </DashboardLayout>
  );
}
