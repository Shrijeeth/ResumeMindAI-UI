import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/app/lib/supabase/server";
import AnalysisHistoryContent from "./AnalysisHistoryContent";

export const metadata: Metadata = {
  title: "Analysis History - ResumeMindAI",
  description: "View and manage your document analysis history.",
};

export default async function HistoryPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  return <AnalysisHistoryContent user={user} />;
}
