import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/app/lib/supabase/server";
import DashboardContent from "./DashboardContent";

export const metadata: Metadata = {
  title: "Dashboard - ResumeMindAI",
  description: "Your AI-powered career intelligence dashboard.",
};

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Double-check authentication (middleware should handle this, but belt-and-suspenders)
  if (!user) {
    redirect("/auth/login");
  }

  return <DashboardContent user={user} />;
}
